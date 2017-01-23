import { createSelector } from 'reselect';
import { Map, fromJS } from 'immutable';
import { getTimeIndex } from './timeSelectors';

const getPositions = state => state.positions;

export const getCurrentPosition = createSelector(
  getTimeIndex,
  getPositions,
  (time, positions) => positions.get(time) || Map({ lat: 0, lng: 0, formatted: "0\u00B0N, 0\u00B0E" })
);

const SHOW_WHOLE_WORLD = Map({
  bounds: Map({
    north: 89,
    south: -89,
    west: -179,
    east: 179
  })
});

export const getDefaultFlightMapPosition = createSelector(
  getPositions,
  positions => {
    if (positions.count() === 0) {
      return SHOW_WHOLE_WORLD;
    }

    const first = positions.get(0).toObject();

    const bounds = positions.reduce((previous, current) => {
      const lat = current.get('lat');
      const lng = current.get('lng');
      return {
        north: Math.max(previous.north, lat),
        south: Math.min(previous.south, lat),
        west: Math.min(previous.west, lng),
        east: Math.max(previous.east, lng)
      };
    },
    {
      north: first.lat,
      south: first.lat,
      west: first.lng,
      east: first.lng
    });

    return fromJS({bounds});
  }
);

