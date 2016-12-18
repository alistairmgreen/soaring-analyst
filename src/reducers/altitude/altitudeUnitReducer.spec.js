import { describe, it } from 'mocha';
import chai from 'chai';
import altitudeUnitReducer from './altitudeUnitReducer';
import { FEET, METRES } from '../../constants/units';
import { setAltitudeUnit } from '../../actions/actions';

chai.should();

describe('altitudeUnitReducer', function () {
  it('defaults to feet', function () {
    altitudeUnitReducer().should.equal(FEET);
  });

  describe('when the altitude unit is set', function () {
    it('returns the new unit', function () {
      altitudeUnitReducer(FEET, setAltitudeUnit(METRES))
        .should.equal(METRES);
    });
  });
});
