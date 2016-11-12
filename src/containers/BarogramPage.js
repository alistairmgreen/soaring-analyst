import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { List } from 'immutable';
import Timeline from '../components/Timeline';
import Barogram from '../components/charts/Barogram';
import * as actionCreators from '../actions/actions';
import * as keys from '../constants/StateKeys';

function BarogramPage(props) {
    const trace = props.loggerTrace;
    const currentAltitude = trace.get(keys.CURRENT_ALTITUDE);

    return(
        <div>
            <Timeline timeIndex={props.timeIndex}
                      max={props.maxTimeIndex}
                      currentTime={props.currentTime}
                      currentAltitude={currentAltitude}
                      setTimeIndex={props.actions.setTimeIndex} />

            <Barogram timestamps={props.timestamps}
              altitudes={trace.get(keys.GPS_ALTITUDES)}
              currentTime={props.currentTime}
              timeZoneName ={props.timeZoneName}
              currentAltitude={currentAltitude}
              onPlotClick={props.actions.setTimeIndex}/>
        </div>
    );
}

BarogramPage.propTypes = {
  loggerTrace: PropTypes.object.isRequired,
  timeIndex: PropTypes.number.isRequired,
  maxTimeIndex: PropTypes.number.isRequired,
  currentTime: PropTypes.instanceOf(moment).isRequired,
  timestamps: PropTypes.instanceOf(List).isRequired,
  timeZoneName: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    timeIndex: state.time.get(keys.TIME_INDEX),
    maxTimeIndex: state.time.get(keys.MAX_TIME_INDEX),
    timestamps: state.time.get(keys.TIMESTAMPS),
    currentTime: state.time.get(keys.CURRENT_TIMESTAMP),
    timeZoneName: state.time.get(keys.TIME_ZONE_NAME),
    loggerTrace: state.loggerTrace
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarogramPage);
