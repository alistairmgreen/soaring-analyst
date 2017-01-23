import { describe, it } from 'mocha';
import chai from 'chai';
import { List, Map, fromJS } from 'immutable';
import { getCurrentPosition, getDefaultFlightMapPosition } from './positionSelectors';

chai.should();

describe('getCurrentPosition selector', function () {
  describe('given an empty list of position fixes', function () {
    const state = {
      positions: List()
    };

    it('returns a position at 0 degrees North, 0 degrees East', function () {
      getCurrentPosition(state).should.equal(Map({
        lat: 0,
        lng: 0,
        formatted: "0\u00B0N, 0\u00B0E"
      }));
    });
  });

  describe('given a valid list of position fixes', function () {
    const pos0 = Map({ lat: 0, lng: 0 });
    const pos1 = Map({ lat: 1, lng: 1 });
    const pos2 = Map({ lat: 2, lng: 2 });

    const positions = List.of(pos0, pos1, pos2);

    positions.forEach((expectedPosition, index) => {
      describe(`given time index ${index}`, function () {
        const state = {
          timeIndex: index,
          positions
        };

        it('returns the correct position', function () {
          getCurrentPosition(state)
            .should.equal(expectedPosition);
        });
      });
    });
  });
});

describe('getDefaultFlightMapPosition', function () {
  describe('given an empty list of position fixes', function () {
    const mapPosition = getDefaultFlightMapPosition({ positions: List() });
    it('sets map bounds to the whole world', function () {
      mapPosition.should.equal(fromJS({
        bounds: {
          north: 89,
          south: -89,
          west: -179,
          east: 179
        }
      }));
    });
  });

  describe('given a valid list of position fixes', function () {
    const state = {
      positions: fromJS([
        { lat: -1, lng: -2 },
        { lat: 1, lng: 2 },
        { lat: 3, lng: 0 }
      ])
    };

    it('sets map bounds to the bounds of the flight path', function () {
      getDefaultFlightMapPosition(state)
        .should.equal(fromJS({
          bounds: {
            north: 3,
            south: -1,
            west: -2,
            east: 2
          }
        }));
    });
  });
});
