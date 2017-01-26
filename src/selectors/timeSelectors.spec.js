import { describe, it } from 'mocha';
import chai from 'chai';
import moment from 'moment';
import chaiMoment from 'chai-moment';
import { List } from 'immutable';

import { getCurrentTime, getMaxTimeIndex, getUtcOffset } from './timeSelectors';

chai.use(chaiMoment);
chai.should();

describe('getCurrentTime', function () {
  it('returns the time at the current index', function () {
    const EXPECTED_TIME = moment.utc([2016, 10, 1, 9, 0, 0]);
    const state = {
      timestamps: List.of(
        moment.utc([2016, 10, 1, 8, 59, 59]),
        EXPECTED_TIME,
        moment.utc([2016, 10, 1, 9, 0, 1])
      ),
      timeIndex: 1
    };

    getCurrentTime(state)
      .should.be.sameMoment(EXPECTED_TIME);
  });
});

describe('getMaxTimeIndex', function() {
  it('returns the index of the last timestamp', function () {
    const state = {
      timestamps: List.of(moment(), moment(), moment())
    };

    getMaxTimeIndex(state).should.equal(2);
  });
});

describe('getUtcOffset', function () {
  const expectedOffsetMinutes = 60;
  const state = {
    timestamps: List.of(
      moment.utc([2016, 10, 1, 8, 59, 59]).utcOffset(expectedOffsetMinutes)
    )
  };

  it('returns the UTC offset of the first timestamp', function () {
    getUtcOffset(state).should.equal(expectedOffsetMinutes);
  });
});
