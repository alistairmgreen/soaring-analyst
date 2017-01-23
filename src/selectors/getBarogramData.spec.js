import { describe, it } from 'mocha';
import chai from 'chai';
import moment from 'moment';
import chaiMoment from 'chai-moment';
import { List, Map } from 'immutable';
import getBarogramData from './getBarogramData';
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

  let data;

  beforeEach(function () {
    data = getBarogramData(state);
  });

  it('returns an array', function () {
    data.should.be.an('array');
  });

  it('returns a data point for every timestamp', function () {
    data.should.have.lengthOf(3);
  });

  it('maps timestamps to x property', function () {
    data.forEach((item, index) => {
      item.x.should.be.sameMoment(timestamps[index]);
    });
  });

  it('maps altitudes to y property', function () {
    data.forEach((item, index) => {
      item.y.should.equal(altitudes[index]);
    });
  });
});
