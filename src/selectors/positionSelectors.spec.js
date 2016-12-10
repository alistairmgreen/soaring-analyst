import { describe, it } from 'mocha';
import chai from 'chai';
import { List } from 'immutable';
import { getCurrentPosition } from './positionSelectors';

chai.should();

describe('getCurrentPosition selector', function () {
  describe('given an empty list of position fixes', function () {
    const state = {
      positions: List()
    };

    it('returns a position at 0 degrees North, 0 degrees East', function () {
      getCurrentPosition(state).should.deep.equal({
        lat: 0,
        lng: 0,
        formatted: "0\u00B0N, 0\u00B0E"
      });
    });
  });

  describe('given a valid list of position fixes', function () {
    const pos0 = { lat: 0, lng: 0 };
    const pos1 = { lat: 1, lng: 1 };
    const pos2 = { lat: 2, lng: 2 };

    const positions = List.of(pos0, pos1, pos2);

    positions.forEach((expectedPosition, index) => {
      describe(`given time index ${index}`, function () {
        const state = {
          timeIndex: index,
          positions
        };

        it('returns the correct position', function () {
          getCurrentPosition(state)
            .should.deep.equal(expectedPosition);
        });
      });
    });
  });
});
