import { createSelector } from 'reselect';
import { getTimeIndex } from './timeSelectors';
import { POSITIONS } from '../constants/StateKeys';

const getLoggerTrace = state => state.loggerTrace;

export const getCurrentPosition = createSelector(
  getTimeIndex,
  getLoggerTrace,
  (time, trace) => trace.getIn([POSITIONS, time]) || { lat: 0, lng: 0, formatted: "0\u00B0N, 0\u00B0E" }
);
