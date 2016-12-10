import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Slider from './Slider';
import TimeAndPositionDisplay from './TimeAndPositionDisplay';
import * as keys from '../../constants/StateKeys';
import { setTimeIndex } from '../../actions/actions';
import { getCurrentTime, getMaxTimeIndex } from '../../selectors/timeSelectors';
import { getCurrentAltitude } from '../../selectors/altitudeSelectors';
import { getCurrentPosition } from '../../selectors/positionSelectors';

function Timeline(props) {
  return (
    <div style={{ width: "100%" }}>
      <Slider
        value={props.timeIndex}
        max={props.maxTimeIndex}
        onChange={props.onTimeChange} />

      <TimeAndPositionDisplay
        time={props.time}
        position={props.position}
        altitude={props.altitude}
        altitudeSource={props.altitudeSource}
        altitudeUnit={props.altitudeUnit} />
    </div>
  );
}

Timeline.propTypes = {
  timeIndex: PropTypes.number,
  maxTimeIndex: PropTypes.number,
  time: PropTypes.instanceOf(moment).isRequired,
  position: PropTypes.string.isRequired,
  altitude: PropTypes.number.isRequired,
  altitudeSource: PropTypes.string.isRequired,
  altitudeUnit: PropTypes.string.isRequired,
  onTimeChange: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    timeIndex: state.timeIndex,
    maxTimeIndex: getMaxTimeIndex(state),
    time: getCurrentTime(state),
    position: getCurrentPosition(state).get('formatted'),
    altitude: getCurrentAltitude(state),
    altitudeSource: state.altitude.get(keys.ALTITUDE_SOURCE),
    altitudeUnit: state.altitude.get(keys.ALTITUDE_UNIT_ABBREVIATION)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTimeChange: t => dispatch(setTimeIndex(t))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
