import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS } from 'immutable';

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

  describe('when a file load is triggered', function () {

    const expectedFileName = "loggertrace.igc";
    let newState;

    beforeEach(function () {
      newState = loggerTraceReducer(emptyLoggerTrace, actions.fileLoading(expectedFileName));
    });

    it('sets the file load in progress flag to true', function () {
      newState.get("fileLoadInProgress").should.be.true;
    });

    it('sets the file name', function () {
      newState.get("fileName").should.equal(expectedFileName);
    });
  });

  describe('when a file is loaded successfully', function () {

    let newState;
    let expectedFileName = "loggertrace.igc";
    const stubLoggerTrace = {
      headers: [
        {
          name: "Pilot",
          value: "John Smith"
        },
        {
          name: "Glider ID",
          value: "G-ABCD"
        }
      ]
    };

    beforeEach(function () {
      let loadAction = actions.loadFileSuccess(expectedFileName, stubLoggerTrace);
      let oldState = emptyLoggerTrace.merge({
        errorMessage: 'error message',
        fileLoadInProgress: true
      });

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

    it('sets the file load in progress flag to false', function () {
      newState.get('fileLoadInProgress').should.be.false;
    });

    it('sets the headers', function() {
      newState.get('headers').should.equal(fromJS(stubLoggerTrace.headers));
    });

  });

  describe('when a file load fails', function () {
    let newState;
    const expectedMessage = "error loading file";

    beforeEach(function () {
      let oldState = emptyLoggerTrace.merge({
        fileLoaded: true,
        fileLoadInProgress: true
      });

      newState = loggerTraceReducer(oldState, actions.loadFileFailure(expectedMessage));
    });

    it('sets the error message', function () {
      newState.get('errorMessage')
        .should.equal(expectedMessage);
    });

    it('sets the file loaded flag to false', function () {
      newState.get('fileLoaded')
        .should.be.false;
    });

    it('sets the file load in progress flag to false', function () {
      newState.get('fileLoadInProgress').should.be.false;
    });
  });

});
