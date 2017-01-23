import { describe, it } from 'mocha';
import chai from 'chai';
import altitudeSourceReducer from './altitudeSourceReducer';
import * as SOURCE from '../../constants/altitudeSources';
import { setAltitudeSource } from '../../actions/actions';

chai.should();

describe('altitudeSourceReducer', function () {
  it('defaults to GPS', function () {
    altitudeSourceReducer().should.equal(SOURCE.GPS);
  });

  describe('when the altitude source is set', function () {
    it('returns the new source', function () {
      altitudeSourceReducer(SOURCE.GPS, setAltitudeSource(SOURCE.PRESSURE))
        .should.equal(SOURCE.PRESSURE);
    });
  });
});
