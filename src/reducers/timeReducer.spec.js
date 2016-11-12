import { describe, it } from 'mocha';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiMoment from 'chai-moment';
import { List, Map } from 'immutable';
import moment from 'moment';

import timeReducer from './timeReducer';
import * as actions from '../actions/actions';
import * as keys from '../constants/StateKeys';

chai.use(chaiImmutable);
chai.use(chaiMoment);
chai.should();

describe('Time reducer', function () {
  it('has an initial state defaulting to UTC', function () {
    timeReducer().get(keys.TIME_ZONE_NAME)
      .should.equal('Coordinated Universal Time');
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
      let initialState = Map({
        timeZoneName: "Pacific Standard Time",
        currentTimestamp: 1
      });

      newState = timeReducer(initialState, actions.loadFileSuccess('filename.igc', stubLoggerTrace));
    });

    it('resets the time zone to UTC', function () {
      newState.get(keys.TIME_ZONE_NAME)
        .should.equal('Coordinated Universal Time');
    });

    it('copies the timestamp values from the logger trace into an immutable list', function () {
      newState.get(keys.TIMESTAMPS)
        .should.equal(List.of(stubLoggerTrace.fixes[0].timestamp, stubLoggerTrace.fixes[1].timestamp));
    });

    it('sets the selected time index to zero', function () {
      newState.get(keys.TIME_INDEX).should.equal(0);
    });

    it('sets the maximum time index to the number of timestamps minus one', function () {
      newState.get(keys.MAX_TIME_INDEX).should.equal(1);
    });

    it('sets the current timestamp equal to the first timestamp', function () {
      newState.get(keys.CURRENT_TIMESTAMP)
        .should.be.sameMoment(stubLoggerTrace.fixes[0].timestamp);
    });
  });

  describe('when the time zone is set', function () {
    const initialState = Map({
      timezoneName: 'Coordinated Universal Time',
      timestamps: List.of(
        moment.utc([2016, 10, 15, 9, 30, 0]),
        moment.utc([2016, 10, 15, 9, 30, 10])
      ),
      currentTimestamp: moment.utc([2016, 10, 15, 9, 30, 0])
    });

    const OFFSET_SECONDS = -28800;
    const OFFSET_MINUTES = OFFSET_SECONDS / 60;
    const PST = "Pacific Standard Time";

    let newState;

    beforeEach(function () {
      newState = timeReducer(initialState,
        actions.setTimezone(OFFSET_SECONDS, PST));
    });

    it('adjusts the timezones of all timestamps', function () {
      let newTimestamps = newState.get(keys.TIMESTAMPS);
      newTimestamps.forEach(t => t.utcOffset().should.equal(OFFSET_MINUTES));
    });

    it('adjusts the timezone of the current timestamp', function () {
      newState.get(keys.CURRENT_TIMESTAMP)
        .utcOffset()
        .should.equal(OFFSET_MINUTES);
    });

    it('sets the time zone name', function () {
      newState.get(keys.TIME_ZONE_NAME)
        .should.equal(PST);
    });
  });

  describe('when the time index is set', function () {
    let newState;

    beforeEach(function () {
      const initialState = Map({
        timeIndex: 0,
        timestamps: List.of(
          moment.utc([2016, 10, 15, 9, 30, 0]),
          moment.utc([2016, 10, 15, 9, 30, 10])),
        currentTimestamp: moment.utc([2016, 10, 15, 9, 30, 0])
      });

      newState = timeReducer(initialState, actions.setTimeIndex(1));
    });

    it('updates the time index property', function () {
      newState.get(keys.TIME_INDEX)
        .should.equal(1);
    });

    it('updates the current timestamp', function () {
      newState.get(keys.CURRENT_TIMESTAMP)
        .should.be.sameMoment(moment.utc([2016, 10, 15, 9, 30, 10]));
    });
  });
});
