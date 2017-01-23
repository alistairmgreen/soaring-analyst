import { describe, it } from 'mocha';
import chai from 'chai';
import errorMessageReducer from './errorMessageReducer';
import { loadFileFailure, loadFileSuccess } from '../actions/actions';

chai.should();

describe('Error message reducer', function () {
  it('defaults to an empty string', function () {
    errorMessageReducer().should.be.an.empty.string;
  });

  describe('When a file load fails', function () {
    const message = "An error has occurred";
    let state;

    beforeEach(function() {
      state = errorMessageReducer("", loadFileFailure(message));
    });

    it('sets the error message', function () {
      state.should.equal(message);
    });
  });

  describe('When a file load succeeds', function () {
    let state;

    beforeEach(function () {
      state = errorMessageReducer("Error message", loadFileSuccess("filename.igc", {}));
    });

    it('clears any existing error message', function () {
      state.should.be.an.empty.string;
    });
  });
});
