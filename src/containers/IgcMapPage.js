import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { List } from 'immutable';
import FlightMap from '../components/googlemap/FlightMap';
import Timeline from '../components/Timeline';
import * as actionCreators from '../actions/actions';
import * as keys from '../constants/StateKeys';
import * as TASK_STATE from '../constants/TaskStateKeys';


export function IgcMapPage(props) {
  let trace = props.loggerTrace;
  let flightPath = trace.get(keys.POSITIONS);

  return (
    <div>
      <Timeline timeIndex={props.timeIndex}
        max={props.maxTimeIndex}
        currentTime={props.currentTime}
        currentAltitude={props.currentAltitude}
        altitudeUnit={props.altitudeUnitAbbreviation}
        altitudeSource={props.altitudeSource}
        setTimeIndex={props.actions.setTimeIndex} />

      <FlightMap flightPath={flightPath}
        currentPosition={trace.get(keys.CURRENT_POSITION)}
        task={props.task}
        defaultLocation={trace.get(keys.DEFAULT_MAP_LOCATION)}
        zoomToFitLabel="Flight path" />
    </div>
  );
}

IgcMapPage.propTypes = {
  task: PropTypes.object.isRequired,
  loggerTrace: PropTypes.object.isRequired,
  timeIndex: PropTypes.number.isRequired,
  maxTimeIndex: PropTypes.number.isRequired,
  currentTime: PropTypes.instanceOf(moment).isRequired,
  timestamps: PropTypes.instanceOf(List).isRequired,
  altitudes: PropTypes.instanceOf(List).isRequired,
  currentAltitude: PropTypes.number.isRequired,
  altitudeUnit: PropTypes.string.isRequired,
  altitudeUnitAbbreviation: PropTypes.string.isRequired,
  altitudeSource: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const timeIndex = state.time.get(keys.TIME_INDEX);

  const props = {
    task: state.task.get(TASK_STATE.WAYPOINTS),
    loggerTrace: state.loggerTrace,
    timeIndex,
    maxTimeIndex: state.time.get(keys.MAX_TIME_INDEX),
    timestamps: state.time.get(keys.TIMESTAMPS),
    currentTime: state.time.get(keys.CURRENT_TIMESTAMP),
    altitudes: state.altitude.get(keys.ALTITUDES),
    currentAltitude: state.altitude.getIn([keys.ALTITUDES, timeIndex]),
    altitudeUnit: state.altitude.get(keys.ALTITUDE_UNIT),
    altitudeUnitAbbreviation: state.altitude.get(keys.ALTITUDE_UNIT_ABBREVIATION),
    altitudeSource: state.altitude.get(keys.ALTITUDE_SOURCE)
  };

  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IgcMapPage);
