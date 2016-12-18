import { createSelector } from 'reselect';
import { getTimeIndex } from './timeSelectors';
import { FEET } from '../constants/units';

const M_TO_FT = 3.28084;

export const getAltitudeUnit = state => state.altitude.unit;

export const getAltitudeUnitAbbreviation = createSelector(
  [getAltitudeUnit, state => state.altitude.unitAbbreviations],
  (unit, abbreviations) => abbreviations.get(unit));

export const getAvailableAltitudeUnits = state => state.altitude.availableUnits;

export const getAltitudeSource = state => state.altitude.source;

export const getAvailableAltitudeSources = state => state.altitude.availableSources;

const getRawAltitudes = state => state.altitude.values;

export const getAltitudes = createSelector(
  [getAltitudeSource, getAltitudeUnit, getRawAltitudes],
  (source, unit, rawAltitudes) => {
    const altitudeMetres = rawAltitudes.get(source);

    if (unit === FEET) {
      return altitudeMetres.map(a => a * M_TO_FT);
    }

    return altitudeMetres;
  }
);

export const getCurrentAltitude = createSelector(
  [getTimeIndex, getAltitudes],
  (index, altitudes) => altitudes.get(index));
