import { describe, it } from 'mocha';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiMoment from 'chai-moment';
import { List, Map, fromJS } from 'immutable';
import moment from 'moment';

import loggerTraceReducer from './loggerTraceReducer';
import { emptyLoggerTrace } from './initialState';
import * as actions from '../actions/actions';
import * as keys from '../constants/StateKeys';

chai.use(chaiImmutable);
chai.use(chaiMoment);
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

    it('sets the file name', function () {
      newState.get(keys.FILE_NAME).should.equal(expectedFileName);
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
      newState.get(keys.FILE_NAME).should.equal(expectedFileName);
    });

    it('clears any existing error message', function () {
      newState.get(keys.ERROR_MESSAGE).should.be.empty;
    });

    it('sets the headers', function () {
      newState.get(keys.HEADERS).should.equal(fromJS(stubLoggerTrace.headers));
    });

    it('sets a list of positions', function () {
      newState.get(keys.POSITIONS)
        .should.equal(
        List.of(
          stubLoggerTrace.fixes[0].position,
          stubLoggerTrace.fixes[1].position
        ));
    });

    it('sets the current position equal to the first position fix', function () {
      newState.get(keys.CURRENT_POSITION)
        .should.equal(Map(stubLoggerTrace.fixes[0].position));
    });

    it('sets the default map view to the bounds of the flight path', function() {
      newState.get(keys.DEFAULT_MAP_LOCATION).toObject()
        .should.deep.equal({
          bounds: {
            north: 1.23,
            south: 1.2,
            west: 3.4,
            east: 3.45
          }
        });
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
      newState.get(keys.ERROR_MESSAGE)
        .should.equal(expectedMessage);
    });
  });
});
