import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMap from '../components/googlemap/GoogleMap';
import Marker from '../components/googlemap/Marker';
import * as icons from '../components/googlemap/icons';
import Polyline from '../components/googlemap/Polyline';
import Timeline from '../components/Timeline';
import * as actionCreators from '../actions/actions';
import * as keys from '../constants/StateKeys';

export function IgcMapPage(props) {
  let trace = props.loggerTrace;
  let positions = trace.get(keys.POSITIONS).toArray();
  let startPoint = positions[0];
  let currentPosition = trace.get(keys.CURRENT_POSITION);
  return (
    <div>
      <Timeline timeIndex={trace.get(keys.TIME_INDEX)}
        max={trace.get(keys.MAX_TIME_INDEX)}
        currentTime={trace.get(keys.CURRENT_TIMESTAMP)}
        currentAltitude={trace.get(keys.CURRENT_ALTITUDE)}
        setTimeIndex={props.actions.setTimeIndex} />

      <GoogleMap googlemaps={global.google.maps} defaultLocation={startPoint} >

        <Marker position={currentPosition} autoScroll label={icons.UNICODE_PLANE} />

        <Polyline path={trace.get(keys.POSITIONS)} />
      </GoogleMap>

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
