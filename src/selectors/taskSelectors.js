import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import calculateBounds from '../geometry/calculateBounds';

export const getWaypoints = state => state.task;

export const getWaypointNames = createSelector(
  [getWaypoints],
  waypoints => waypoints.map(x => x.get('name')));

const SHOW_WHOLE_WORLD = fromJS({
  bounds: {
    north: 89,
    south: -89,
    west: -179,
    east: 179
  }
});

export const getTaskBounds = createSelector(
  [getWaypoints],
  waypoints => {
    if (waypoints.count() === 0) {
      return SHOW_WHOLE_WORLD;
    }

    const bounds = calculateBounds(waypoints.toJS());
    return fromJS({ bounds });
  }
);
