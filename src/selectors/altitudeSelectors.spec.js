import { describe, it } from 'mocha';
import chai from 'chai';
import { List, Map } from 'immutable';
import { getCurrentAltitude } from './altitudeSelectors';

chai.should();

describe('getCurrentAltitude selector', function () {
  it('returns the altitude corresponding to the time index', function () {
    const state = {
      timeIndex: 1,
      altitude: Map({
        altitudes: List.of(0, 1, 2, 3)
      })
    };

    getCurrentAltitude(state).should.equal(1);
  });
});

