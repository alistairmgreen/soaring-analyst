import { createSelector } from 'reselect';
import { getTimeIndex } from './timeSelectors';
import * as keys from '../constants/StateKeys';

export const getAltitudes = state => state.altitude.get(keys.ALTITUDES);

export const getAltitudeUnit = state => state.altitude.get(keys.ALTITUDE_UNIT);

export const getAvailableAltitudeUnits = state => state.altitude.get(keys.AVAILABLE_ALTITUDE_UNITS);

export const getAltitudeSource = state => state.altitude.get(keys.ALTITUDE_SOURCE);

export const getAvailableAltitudeSources = state => state.altitude.get(keys.AVAILABLE_ALTITUDE_SOURCES);

export const getCurrentAltitude = createSelector(
  getTimeIndex,
  getAltitudes,
  (index, altitudes) => altitudes.get(index));
