import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { List, fromJS } from 'immutable';
import moment from 'moment';

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
      ],
      fixes: [
        {
          timestamp: moment.utc([2016, 10, 15, 9, 30, 0]),
          position: {
            lat: 1.2,
            lng: 3.4
          },
          gpsAltitude: 300,
          pressureAltitude: 400,
          validGpsAltitude: true
        },
        {
          timestamp: moment.utc([2016, 10, 15, 9, 30, 10]),
          position: {
            lat: 1.23,
            lng: 3.45
          },
          gpsAltitude: 310,
          pressureAltitude: 410,
          validGpsAltitude: true
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

    it('sets the headers', function () {
      newState.get('headers').should.equal(fromJS(stubLoggerTrace.headers));
    });

    it('sets a list of timestamps', function () {
      newState.get('timestamps')
        .should.equal(List.of(
          stubLoggerTrace.fixes[0].timestamp,
          stubLoggerTrace.fixes[1].timestamp));
    });

    it('sets a list of positions', function () {
      newState.get('positions')
        .should.equal(
        List.of(
          stubLoggerTrace.fixes[0].position,
          stubLoggerTrace.fixes[1].position
        ));
    });

    it('sets a list of pressure altitudes', function () {
      newState.get('pressureAltitudes')
        .should.equal(List([400, 410]));
    });

    it('sets a list of GPS altitudes', function () {
      newState.get('gpsAltitudes')
        .should.equal(List([300, 310]));
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
