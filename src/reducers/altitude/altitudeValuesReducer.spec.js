import { describe, it } from 'mocha';
import chai from 'chai';
import { List, Map, fromJS } from 'immutable';
import chaiImmutable from 'chai-immutable';
import altitudeValuesReducer from './altitudeValuesReducer';
import { loadFileSuccess } from '../../actions/actions';

chai.should();
chai.use(chaiImmutable);

const emptyAltitudeValues = fromJS({
  GPS: [],
  Pressure: []
});

describe('altitudeValuesReducer', function () {
  describe('initial state', function () {
    const initialState = altitudeValuesReducer();

    it('should be an immutable map containing empty lists', function () {
      initialState.should.equal(emptyAltitudeValues);
    });
  });

  describe('when a file is loaded', function () {
    let state;

    beforeEach(function () {
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

      const action = loadFileSuccess('filename.igc', loggerTrace);
      state = altitudeValuesReducer(emptyAltitudeValues, action);
    });

    it('returns an immutable map', function () {
      state.should.be.an.instanceOf(Map);
    });

    it('sets the pressure altitudes', function () {
      state.get('Pressure')
        .should.equal(List.of(400, 410));
    });

    it('sets the GPS altitudes', function () {
      state.get('GPS')
        .should.equal(List.of(300, 310));
    });
  });
});
