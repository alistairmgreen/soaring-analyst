import { describe, it } from 'mocha';
import chai from 'chai';
import { List, Map } from 'immutable';
import { FEET, METRES } from '../constants/units';
import { GPS, PRESSURE } from '../constants/altitudeSources';
import * as selectors from './altitudeSelectors';

chai.should();

describe('getAltitudeUnit', function () {
  const state = {
    altitude: {
      unit: FEET
    }
  };

  it('returns the unit name', function () {
    selectors.getAltitudeUnit(state)
      .should.equal(FEET);
  });
});

describe('getAltitudeSource', function () {
  const state = {
    altitude: {
      source: GPS
    }
  };

  it('returns the altitude source', function () {
    selectors.getAltitudeSource(state)
      .should.equal(GPS);
  });
});

const GPS_METRES = List.of(1, 2, 3);
const GPS_FEET = GPS_METRES.map(x => x * selectors.M_TO_FT);
const PRESSURE_METRES = List.of(4, 5, 6);
const PRESSURE_FEET = PRESSURE_METRES.map(x => x * selectors.M_TO_FT);

const testCases = [
  { unit: METRES, source: GPS, expected: GPS_METRES, timeIndex: 0 },
  { unit: FEET, source: GPS, expected: GPS_FEET, timeIndex: 1 },
  { unit: METRES, source: PRESSURE, expected: PRESSURE_METRES, timeIndex: 2 },
  { unit: FEET, source: PRESSURE, expected: PRESSURE_FEET, timeIndex: 1 }
];

testCases.forEach(test => {
  describe(`When the altitude source is ${test.source} and the unit is ${test.unit}`, function () {
    const state = {
      altitude: {
        unit: test.unit,
        source: test.source,
        values: Map({
          GPS: GPS_METRES,
          Pressure: PRESSURE_METRES
        })
      },
      timeIndex: test.timeIndex
    };

    describe('getAltitudes', function () {
      it(`returns a list of ${test.source} altitudes in ${test.unit}`, function () {
        selectors.getAltitudes(state)
          .should.equal(test.expected);
      });
    });

    describe('getCurrentAltitude', function () {
      it('returns the altitude with the correct source, unit and time index', function () {
        selectors.getCurrentAltitude(state)
          .should.equal(test.expected.get(test.timeIndex));
      });
    });
  });
});

