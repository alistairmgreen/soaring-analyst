import { describe, it } from 'mocha';
import chai from 'chai';
import * as actions from '../actions/actions';
import timeIndexReducer from './timeIndexReducer';

chai.should();

describe('Time index reducer', function () {
  it('defaults to zero', function () {
    timeIndexReducer().should.equal(0);
  });

  describe('when the time index is set', function () {
    const TIME_INDEX = 10;
    const PREVIOUS_STATE = 1;
    let newIndex;

    beforeEach(function(){
      newIndex = timeIndexReducer(PREVIOUS_STATE, actions.setTimeIndex(TIME_INDEX));
    });

    it('returns the new time index', function () {
      newIndex.should.equal(TIME_INDEX);
    });
  });

  describe('when a file is loaded', function () {
    const PREVIOUS_STATE = 1;
    let newIndex;

    beforeEach(function(){
      newIndex = timeIndexReducer(PREVIOUS_STATE, actions.loadFileSuccess('filename.igc', {}));
    });

    it('resets the time index to zero', function () {
      newIndex.should.equal(0);
    });
  });
});
