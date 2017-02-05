import { createSelector } from 'reselect';
import moment from 'moment';
import { getTimestamps, getUtcOffset } from './timeSelectors';
import { getAltitudes } from './altitudeSelectors';

export const getAltitudeDataSeries = createSelector(
  getTimestamps,
  getAltitudes,
  (timestamps, altitudes) => {
    let series = [];

    timestamps.forEach((t, index) => {
      series.push([t.unix(), altitudes.get(index)]);
    });

    return series;
  });

export const getBarogramData = createSelector(
  getAltitudeDataSeries,
  altitudeDataSeries => ([{
    data: altitudeDataSeries,
    color: "#000080", // Navy blue
    lines: {
      lineWidth: 1
    },
    points: {
      show: false
    },
    shadowSize: 0
  }]));

export const getTickFormatter = createSelector(
  getUtcOffset,
  utcOffset => (t => moment.unix(t).utcOffset(utcOffset).format('HH:mm'))
);

function chooseTickInterval(durationMinutes) {
  let interval;
  if (durationMinutes <= 10) {
    interval = 1;
  }
  else if (durationMinutes <= 50) {
    interval = 5;
  }
  else if (durationMinutes <= 100) {
    interval = 10;
  }
  else if (durationMinutes <= 150) {
    interval = 15;
  }
  else if (durationMinutes <= 300) {
    interval = 30;
  }
  else if (durationMinutes <= 600) {
    interval = 60;
  }
  else {
    interval = 120;
  }

  return interval;
}

export const getTickGenerator = createSelector(
  getUtcOffset,
  utcOffset => axis => {
    const ticks = [];
    const startMoment = moment.unix(axis.min).utcOffset(utcOffset);
    const endMoment = moment.unix(axis.max).utcOffset(utcOffset);
    const durationMinutes = endMoment.diff(startMoment, 'minutes');
    const interval = chooseTickInterval(durationMinutes);

    const tick = startMoment.clone()
      .startOf('hour');

    if (interval > 60 && tick < startMoment) {
      tick.add(1, 'hours');
    }

    while (tick <= endMoment) {
      if (tick >= startMoment) {
        ticks.push(tick.unix());
      }
      tick.add(interval, 'minutes');
    }

    return ticks;
  });
