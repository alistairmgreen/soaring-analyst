import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import FlotChart from './FlotChart';
import Axis from './Axis';
import { getBarogramData, getTickFormatter, getTickGenerator } from '../../selectors/barogramSelectors';
import { getCurrentAltitude, getAltitudeUnit, getAltitudeSource } from '../../selectors/altitudeSelectors';
import { getCurrentTime } from '../../selectors/timeSelectors';
import { setTimeIndex } from '../../actions/actions';


function Barogram(props) {
  return (
    <FlotChart data={props.data}>
      <Axis axis="x" label={props.timeZoneName} tickFormatter={props.tickFormatter} ticks={props.tickGenerator}/>
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
  tickFormatter: PropTypes.func.isRequired,
  tickGenerator: PropTypes.func.isRequired,
  onPlotClick: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    data: getBarogramData(state),
    altitudeUnit: getAltitudeUnit(state),
    altitudeSource: getAltitudeSource(state),
    currentTime: getCurrentTime(state),
    currentAltitude: getCurrentAltitude(state),
    timeZoneName: state.timeZone,
    tickFormatter: getTickFormatter(state),
    tickGenerator: getTickGenerator(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlotClick: t => dispatch(setTimeIndex(t))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Barogram);
