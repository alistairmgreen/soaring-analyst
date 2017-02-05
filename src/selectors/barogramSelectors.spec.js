import { describe, it } from 'mocha';
import chai from 'chai';
import moment from 'moment';
import chaiMoment from 'chai-moment';
import { List, Map } from 'immutable';
import {
  getAltitudeDataSeries,
  getTickFormatter,
  getTickGenerator
} from './barogramSelectors';
import { METRES } from '../constants/units';
import { GPS } from '../constants/altitudeSources';

chai.use(chaiMoment);
chai.should();

describe('getAltitudeDataSeries selector', function () {
  const timestamps = [
    moment.utc([2016, 10, 1, 9, 0, 0]),
    moment.utc([2016, 10, 1, 9, 0, 1]),
    moment.utc([2016, 10, 1, 9, 0, 2])
  ];

  const altitudes = [1000, 1001, 1002];

  const state = {
    timestamps: List(timestamps),
    altitude: {
      source: GPS,
      unit: METRES,
      values: Map({
        GPS: List(altitudes)
      })
    }
  };

  let data;

  beforeEach(function () {
    data = getAltitudeDataSeries(state);
  });

  it('returns an array with a data point for every timestamp', function () {
    data.should.be.an('array').and.have.lengthOf(3);
  });

  it('returns data points in the form [x y]', function () {
    data.forEach((item) => {
      item.should.be.an('array').and.have.lengthOf(2);
    });
  });

  it('sets x value to seconds since the Unix epoch', function () {
    data.forEach((item, index) => {
      item[0].should.equal(timestamps[index].unix());
    });
  });

  it('maps altitudes to y value', function () {
    data.forEach((item, index) => {
      item[1].should.equal(altitudes[index]);
    });
  });
});

describe('Barogram time axis', function () {
  const testCases = [
    {
      timestamps: List.of(
        moment.utc([2017, 2, 5, 9, 0, 0]),
        moment.utc([2017, 2, 5, 9, 10, 0])),
      expectedTicks: ['09:00', '09:01', '09:02', '09:03', '09:04', '09:05', '09:06', '09:07', '09:08', '09:09', '09:10'],
      expectedInterval: 1
    },
    {
      timestamps: List.of(
        moment.utc([2017, 2, 5, 9, 0, 0]),
        moment.utc([2017, 2, 5, 9, 50, 0])),
      expectedTicks: ['09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50'],
      expectedInterval: 5
    },
    {
      timestamps: List.of(
        moment.utc([2017, 2, 5, 9, 0, 0]),
        moment.utc([2017, 2, 5, 10, 0, 0])),
      expectedTicks: ['09:00', '09:10', '09:20', '09:30', '09:40', '09:50', '10:00'],
      expectedInterval: 10
    },
    {
      timestamps: List.of(
        moment.utc([2017, 2, 5, 9, 0, 0]),
        moment.utc([2017, 2, 5, 11, 30, 0])),
      expectedTicks: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30'],
      expectedInterval: 15
    },
    {
      timestamps: List.of(
        moment.utc([2017, 2, 5, 9, 0, 0]),
        moment.utc([2017, 2, 5, 14, 0, 0])),
      expectedTicks: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
      expectedInterval: 30
    },
    {
      timestamps: List.of(
        moment.utc([2015, 3, 29, 8, 58, 27]).utcOffset(60),
        moment.utc([2015, 3, 29, 17, 27, 31]).utcOffset(60)),
      expectedTicks: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      expectedInterval: 60
    },
    {
      timestamps: List.of(
        moment.utc([2015, 3, 29, 8, 58, 27]).utcOffset(60),
        moment.utc([2015, 3, 29, 19, 30, 31]).utcOffset(60)),
      expectedTicks: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
      expectedInterval: 120
    },
    {
      timestamps: List.of(
        moment.utc([2015, 3, 29, 9, 0, 0]),
        moment.utc([2015, 3, 29, 21, 0, 0])),
      expectedTicks: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'],
      expectedInterval: 120
    }
  ];

  testCases.forEach(test => {
    const takeoff = test.timestamps.get(0);
    const landing = test.timestamps.get(1);

    describe(`for takeoff at ${takeoff.format('HH:mm:ss')} and landing at ${landing.format('HH:mm:ss')}`, function () {
      const state = {
        timestamps: test.timestamps
      };

      const formatter = getTickFormatter(state);
      const tickGenerator = getTickGenerator(state);
      const axis = {
        min: takeoff.unix(),
        max: landing.unix()
      };

      const tickMarks = tickGenerator(axis).map(formatter);

      it(`generates tick marks at ${test.expectedInterval}-minute intervals`, function () {
        tickMarks.should.deep.equal(test.expectedTicks);
      });
    });
  });
});
