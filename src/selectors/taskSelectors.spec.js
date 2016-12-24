import { describe, it } from 'mocha';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS, List } from 'immutable';
import * as selectors from './taskSelectors';

chai.should();
chai.use(chaiImmutable);

const task = fromJS([
  { name: 'One', lat: 1, lng: 2 },
  { name: 'Two', lat: -1, lng: -2 }
]);

describe('getWaypoints', function () {
  const state = { task: task };
  it('returns the list of waypoints', function () {
    selectors.getWaypoints(state)
      .should.equal(task);
  });
});

describe('getWaypointNames', function () {
  const state = { task: task };

  it('returns a list of waypoint names', function () {
    selectors.getWaypointNames(state)
      .should.equal(List.of('One', 'Two'));
  });
});

describe('getTaskBounds', function () {
  describe('given a valid task', function () {
    const state = { task: task };
    const expectedBounds = fromJS({
      bounds: {
        north: 1,
        south: -1,
        west: -2,
        east: 2
      }
    });

    it('returns the bounds of the task', function () {
      selectors.getTaskBounds(state)
        .should.equal(expectedBounds);
    });
  });

  describe('given an empty task', function () {
    const state = { task: List() };

    it('sets map bounds to show the whole world', function () {
      selectors.getTaskBounds(state)
        .should.equal(fromJS({
          bounds: {
            north: 89,
            south: -89,
            west: -179,
            east: 179
          }
        }));
    });
  });
});
