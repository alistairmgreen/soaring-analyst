import { createSelector } from 'reselect';
import { getTimeIndex } from './timeSelectors';
import * as keys from '../constants/StateKeys';

export const getAltitudes = state => state.altitude.get(keys.ALTITUDES);

export const getCurrentAltitude = createSelector(
  getTimeIndex,
  getAltitudes,
  (index, altitudes) => altitudes.get(index));
