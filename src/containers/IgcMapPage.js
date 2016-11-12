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
        currentAltitude={trace.get(keys.CURRENT_ALTITUDE)}
        setTimeIndex={props.actions.setTimeIndex} />

        <FlightMap flightPath={flightPath}
          currentPosition={trace.get(keys.CURRENT_POSITION)}
          task={props.task}
          defaultLocation={trace.get(keys.DEFAULT_MAP_LOCATION)}
          zoomToFitLabel="Flight path"/>
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
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    task: state.task.get(TASK_STATE.WAYPOINTS),
    loggerTrace: state.loggerTrace,
    timeIndex: state.time.get(keys.TIME_INDEX),
    maxTimeIndex: state.time.get(keys.MAX_TIME_INDEX),
    timestamps: state.time.get(keys.TIMESTAMPS),
    currentTime: state.time.get(keys.CURRENT_TIMESTAMP)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IgcMapPage);
