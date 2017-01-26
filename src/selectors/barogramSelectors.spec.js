import { describe, it } from 'mocha';
import chai from 'chai';
import moment from 'moment';
import chaiMoment from 'chai-moment';
import { List, Map } from 'immutable';
import { getBarogramData } from './barogramSelectors';
import { METRES } from '../constants/units';
import { GPS } from '../constants/altitudeSources';

chai.use(chaiMoment);
chai.should();

describe('getBarogramData selector', function () {
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

  let data, series;

  beforeEach(function () {
    data = getBarogramData(state);
    series = data[0];
  });

  it('returns an array within an array', function () {
    data.should.be.an('array').and.have.lengthOf(1);
    series.should.be.an('array');
  });

  it('returns a data point for every timestamp', function () {
    series.should.have.lengthOf(3);
  });

  it('returns data points in the form [x y]', function () {
    series.forEach((item) => {
      item.should.be.an('array').and.have.lengthOf(2);
    });
  });

  it('sets x value to seconds since the Unix epoch', function(){
    series.forEach((item, index) => {
      item[0].should.equal(timestamps[index].unix());
    });
  });

  it('maps altitudes to y value', function () {
    series.forEach((item, index) => {
      item[1].should.equal(altitudes[index]);
    });
  });
});
