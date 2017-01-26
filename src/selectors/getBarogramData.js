import { createSelector } from 'reselect';
import { getTimestamps } from './timeSelectors';
import { getAltitudes } from './altitudeSelectors';

const getBarogramData = createSelector(
  getTimestamps,
  getAltitudes,
  (timestamps, altitudes) => {
    let series = [];

    timestamps.forEach((t, index) => {
      series.push([t.unix(), altitudes.get(index)]);
    });

    return [series];
  });

export default getBarogramData;
