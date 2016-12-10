import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { getTimeIndex } from './timeSelectors';

const getPositions = state => state.positions;

export const getCurrentPosition = createSelector(
  getTimeIndex,
  getPositions,
  (time, positions) => positions.get(time) || Map({ lat: 0, lng: 0, formatted: "0\u00B0N, 0\u00B0E" })
);
