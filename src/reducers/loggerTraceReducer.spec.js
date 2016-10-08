import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import loggerTraceReducer from './loggerTraceReducer';
import { emptyLoggerTrace } from './initialState';
import * as actions from '../actions/actions';

chai.use(chaiImmutable);
chai.should();

describe('Logger trace reducer', function () {

  it('has an initial state', function () {
    loggerTraceReducer(undefined, {})
      .should.equal(emptyLoggerTrace);
  });

  describe('when a file is loaded successfully', function () {

    let newState;
    let expectedFileName = "loggertrace.igc";

    beforeEach(function () {
      let loadAction = actions.loadFileSuccess(expectedFileName);
      let oldState = emptyLoggerTrace.set('errorMessage', 'error message');

      newState = loggerTraceReducer(oldState, loadAction);
    });

    it('sets the file name', function () {
      newState.get('fileName').should.equal(expectedFileName);
    });

    it('clears any existing error message', function () {
      newState.get('errorMessage').should.be.empty;
    });

    it('sets the file loaded flag to true', function () {
      newState.get('fileLoaded').should.be.true;
    });

  });

  describe('when a file load fails', function () {
    let newState;
    const expectedMessage = "error loading file";

    beforeEach(function () {
      let oldState = emptyLoggerTrace.set('fileLoaded', true);

      newState = loggerTraceReducer(oldState, actions.loadFileFailure(expectedMessage));
    });

    it('sets the error message', function() {
      newState.get('errorMessage')
        .should.equal(expectedMessage);
    });

    it('sets the file loaded flag to false', function() {
      newState.get('fileLoaded')
        .should.be.false;
    });
  });

});
