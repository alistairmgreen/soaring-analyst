import { createSelector } from 'reselect';

export const getTimeIndex = state => state.timeIndex;

export const getTimestamps = state => state.timestamps;

export const getCurrentTime = createSelector(
  getTimeIndex,
  getTimestamps,
  (index, timestamps) => timestamps.get(index));

export const getMaxTimeIndex = createSelector(
  getTimestamps,
  timestamps => timestamps.count() - 1);

  export const getUtcOffset = createSelector(
    getTimestamps,
  timestamps => timestamps.get(0).utcOffset());

