import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import { List, Map } from 'immutable';
import altitudeReducer from './altitudeReducer';
import * as keys from '../constants/StateKeys';
import * as actions from '../actions/actions';

chai.use(chaiImmutable);
chai.should();

const testCases = [
  { abbreviation: 'm', unit: 'Metres', source: 'GPS', expectedList: 'gpsMetres' },
  { abbreviation: 'ft', unit: 'Feet', source: 'GPS', expectedList: 'gpsFeet' },
  { abbreviation: 'm', unit: 'Metres', source: 'Pressure', expectedList: 'pressureMetres' },
  { abbreviation: 'ft', unit: 'Feet', source: 'Pressure', expectedList: 'pressureFeet' }
];

describe('Altitude reducer', function () {
  describe('default state', function () {
    let state;

    beforeEach(function () {
      state = altitudeReducer();
    });

    it('is a valid object', function () {
      expect(state).to.be.ok;
    });

    it('contains a list of altitude units', function () {
      state.get(keys.AVAILABLE_ALTITUDE_UNITS)
        .should.equal(List.of('Feet', 'Metres'));
    });

    it('has a default unit', function () {
      expect(state.get(keys.ALTITUDE_UNIT)).to.be.ok;
    });

    it('contains a list of altitude sources', function () {
      state.get(keys.AVAILABLE_ALTITUDE_SOURCES)
        .should.equal(List.of('GPS', 'Pressure'));
    });

    it('has a default altitude source', function () {
      expect(state.get(keys.ALTITUDE_SOURCE)).to.be.ok;
    });
  });

  describe('when an IGC file is loaded', function () {
    const loggerTrace = {
      fixes: [
        {
          gpsAltitude: 300,
          pressureAltitude: 400,
          validGpsAltitude: true
        },
        {
          gpsAltitude: 310,
          pressureAltitude: 410,
          validGpsAltitude: true
        }
      ]
    };

    const loadAction = actions.loadFileSuccess('filename.igc', loggerTrace);

    testCases.forEach(test => {
      describe(`when the altitude unit is set to ${test.unit} and the source is set to ${test.source}`, function () {
        let state;

        beforeEach(function () {
          const previousState = Map({
            unit: test.unit,
            source: test.source,
            altitudes: List(),
            currentAltitude: 0,
            gpsMetres: List(),
            gpsFeet: List(),
            pressureMetres: List(),
            pressureFeet: List()
          });

          state = altitudeReducer(previousState, loadAction);
        });

        it('creates a list of GPS altitudes in metres', function () {
          state.get('gpsMetres')
            .should.equal(List.of(300, 310));
        });

        it('creates a list of pressure altitudes in metres', function () {
          state.get('pressureMetres')
            .should.equal(List.of(400, 410));
        });

        it('creates a list of GPS altitudes in feet', function () {
          state.get('gpsFeet')
            .should.equal(List.of(984.252, 1017.0604));
        });

        it('creates a list of pressure altitudes in feet', function () {
          state.get('pressureFeet')
            .should.equal(List.of(1312.336, 1345.1444));
        });

        it(`copies the ${test.expectedList} list to the altitudes list`, function () {
          state.get(keys.ALTITUDES).should.equal(
            state.get(test.expectedList));
        });
      });
    }); // end of test cases
  }); // end of when IGC file loaded

  testCases.forEach(test => {
    describe(`when the altitude unit is changed to ${test.unit} and the source is ${test.source}`, function () {
      let state;
      const previousState = Map({
          gpsMetres: List.of(1, 2, 3),
          gpsFeet: List.of(3, 6, 9),
          pressureMetres: List.of(4, 5, 6),
          pressureFeet: List.of(12, 15, 18),
          source: test.source
        });

      beforeEach(function () {
        state = altitudeReducer(previousState, actions.setAltitudeUnit(test.unit));
      });

      it('sets the unit name', function () {
        state.get(keys.ALTITUDE_UNIT).should.equal(test.unit);
      });

      it('sets the unit abbreviation', function () {
        state.get(keys.ALTITUDE_UNIT_ABBREVIATION).should.equal(test.abbreviation);
      });

      it('updates the altitudes list', function () {
        state.get(keys.ALTITUDES).should.equal(previousState.get(test.expectedList));
      });
    });
  });

  testCases.forEach(test => {
    describe(`when the altitude source is changed to ${test.source} and the unit is ${test.unit}`, function () {
      let state;
      const previousState = Map({
          gpsMetres: List.of(1, 2, 3),
          gpsFeet: List.of(3, 6, 9),
          pressureMetres: List.of(4, 5, 6),
          pressureFeet: List.of(12, 15, 18),
          unit: test.unit
        });

      beforeEach(function () {
        state = altitudeReducer(previousState, actions.setAltitudeSource(test.source));
      });

      it('sets the source name', function () {
        state.get(keys.ALTITUDE_SOURCE).should.equal(test.source);
      });

      it('updates the altitudes list', function () {
        state.get(keys.ALTITUDES).should.equal(previousState.get(test.expectedList));
      });
    });
  });
});
