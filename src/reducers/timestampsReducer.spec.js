import { describe, it } from 'mocha';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiMoment from 'chai-moment';
import { List } from 'immutable';
import moment from 'moment';

import timeStampsReducer from './timestampsReducer';
import * as actions from '../actions/actions';

chai.use(chaiImmutable);
chai.use(chaiMoment);
chai.should();

describe('Timestamps reducer', function () {
  it('has an initial state ', function () {
    timeStampsReducer().should.be.an.instanceOf(List);
  });

  describe('when an IGC file is loaded', function () {
    let newState;

    const stubLoggerTrace = {
      fixes: [
        {
          timestamp: moment.utc([2016, 10, 15, 9, 30, 0]),
        },
        {
          timestamp: moment.utc([2016, 10, 15, 9, 30, 10]),
        }
      ]
    };

    beforeEach(function () {
      let initialState = List.of(moment.utc([2016, 11, 1, 9, 0, 0]));

      newState = timeStampsReducer(initialState, actions.loadFileSuccess('filename.igc', stubLoggerTrace));
    });

    it('copies the timestamp values from the logger trace into an immutable list', function () {
      newState
        .should.equal(List.of(stubLoggerTrace.fixes[0].timestamp, stubLoggerTrace.fixes[1].timestamp));
    });
  });

  describe('when the time zone is set', function () {
    const initialState = List.of(
        moment.utc([2016, 10, 15, 9, 30, 0]),
        moment.utc([2016, 10, 15, 9, 30, 10])
      );

    const OFFSET_SECONDS = -28800;
    const OFFSET_MINUTES = OFFSET_SECONDS / 60;

    let newState;

    beforeEach(function () {
      newState = timeStampsReducer(initialState,
        actions.setTimezone(OFFSET_SECONDS, "timezone name"));
    });

    it('adjusts the timezones of all timestamps', function () {
      newState.forEach(t => t.utcOffset().should.equal(OFFSET_MINUTES));
    });
  });
});
