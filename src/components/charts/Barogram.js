import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import FlotChart from './FlotChart';
import Axis from './Axis';
import getBarogramData from '../../selectors/getBarogramData';
import { getCurrentAltitude, getAltitudeUnit, getAltitudeSource } from '../../selectors/altitudeSelectors';
import { getCurrentTime } from '../../selectors/timeSelectors';
import { setTimeIndex } from '../../actions/actions';

function chooseTickInterval(durationMinutes) {
  let interval;
  if (durationMinutes <= 10) {
    interval = 1;
  }
  if (durationMinutes <= 50) {
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

function chooseTicks(axis, utcOffset) {
  const ticks = [];
  const startMoment = moment.unix(axis.min).utcOffset(utcOffset);
  const endMoment = moment.unix(axis.max).utcOffset(utcOffset);
  const durationMinutes = endMoment.diff(startMoment, 'minutes');
  const interval = chooseTickInterval(durationMinutes);

  const tick = startMoment.clone()
    .minutes(0)
    .seconds(0);

  while (tick < endMoment) {
    if (tick > startMoment) {
      ticks.push(tick.unix());
    }
    tick.add(interval, 'minutes');
  }

  return ticks;
}

function Barogram(props) {
  const utcOffset = props.currentTime.utcOffset();
  const tickFormatter = (t => moment.unix(t).utcOffset(utcOffset).format('HH:mm'));
  const ticks = (axis => chooseTicks(axis, utcOffset));

  return (
    <FlotChart data={props.data}>
      <Axis axis="x" label={props.timeZoneName} tickFormatter={tickFormatter} ticks={ticks}/>
      <Axis axis="y" label={`${props.altitudeSource} Altitude / ${props.altitudeUnit}`}/>
    </FlotChart>
  );
}

Barogram.propTypes = {
  data: PropTypes.array.isRequired,
  altitudeUnit: PropTypes.string.isRequired,
  altitudeSource: PropTypes.string.isRequired,
  currentTime: PropTypes.instanceOf(moment).isRequired,
  currentAltitude: PropTypes.number.isRequired,
  timeZoneName: PropTypes.string.isRequired,
  onPlotClick: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    data: getBarogramData(state),
    altitudeUnit: getAltitudeUnit(state),
    altitudeSource: getAltitudeSource(state),
    currentTime: getCurrentTime(state),
    currentAltitude: getCurrentAltitude(state),
    timeZoneName: state.timeZone
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlotClick: t => dispatch(setTimeIndex(t))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Barogram);
