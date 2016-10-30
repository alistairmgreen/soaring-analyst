import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlightMap from '../components/googlemap/FlightMap';
import Timeline from '../components/Timeline';
import * as actionCreators from '../actions/actions';
import * as keys from '../constants/StateKeys';

export function IgcMapPage(props) {
  let trace = props.loggerTrace;
  let flightPath = trace.get(keys.POSITIONS);

  return (
    <div>
      <Timeline timeIndex={trace.get(keys.TIME_INDEX)}
        max={trace.get(keys.MAX_TIME_INDEX)}
        currentTime={trace.get(keys.CURRENT_TIMESTAMP)}
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
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    task: state.task,
    loggerTrace: state.loggerTrace
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IgcMapPage);
