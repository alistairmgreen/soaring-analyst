import { describe, it } from 'mocha';
import chai from 'chai';

import timeZoneReducer from './timeZoneReducer';
import * as actions from '../actions/actions';
import { UTC } from '../constants/timezones';
const PST = "Pacific Standard Time";

chai.should();

describe('Time zone reducer', function () {
  it('defaults to Coordinated Universal Time', function () {
    timeZoneReducer().should.equal(UTC);
  });

  describe('when the time zone is set', function () {
    const state = timeZoneReducer(UTC, actions.setTimezone(-28800, PST));

    it('sets the time zone name', function () {
      state.should.equal(PST);
    });
  });

  describe('when a file is loaded', function () {
    it('resets the time zone to UTC', function () {
      timeZoneReducer(PST, actions.loadFileSuccess('filename.igc', {}))
        .should.equal(UTC);
    });
  });
});
