import { createSelector } from 'reselect';
import { getTimestamps } from './timeSelectors';
import { getAltitudes } from './altitudeSelectors';

const getBarogramData = createSelector(
  getTimestamps,
  getAltitudes,
  (timestamps, altitudes) => {
    let data = [];

    timestamps.forEach((t, index) => {
      data.push({
        x: t,
        y: altitudes.get(index)
      });
    });

    return data;
  });

export default getBarogramData;
