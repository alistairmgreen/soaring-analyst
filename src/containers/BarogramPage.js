import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { List } from 'immutable';
import Timeline from '../components/Timeline';
import Barogram from '../components/charts/Barogram';
import AltitudeSelector from '../components/AltitudeSelector';
import * as actionCreators from '../actions/actions';
import * as keys from '../constants/StateKeys';

function BarogramPage(props) {
    return(
        <div>
            <Timeline timeIndex={props.timeIndex}
                      max={props.maxTimeIndex}
                      currentTime={props.currentTime}
                      currentAltitude={props.currentAltitude}
                      altitudeUnit={props.altitudeUnitAbbreviation}
                      altitudeSource={props.altitudeSource}
                      setTimeIndex={props.actions.setTimeIndex} />

            <AltitudeSelector currentSource={props.altitudeSource}
                              altitudeSources={props.availableAltitudeSources}
                              onSourceChanged={props.actions.setAltitudeSource}
                              unit={props.altitudeUnit}
                              availableUnits={props.availableAltitudeUnits}
                              onUnitChanged={props.actions.setAltitudeUnit}/>


            <Barogram timestamps={props.timestamps}
              altitudes={props.altitudes}
              altitudeUnit={props.altitudeUnit}
              altitudeSource={props.altitudeSource}
              currentTime={props.currentTime}
              timeZoneName ={props.timeZoneName}
              currentAltitude={props.currentAltitude}
              onPlotClick={props.actions.setTimeIndex}/>
        </div>
    );
}

BarogramPage.propTypes = {
  timeIndex: PropTypes.number.isRequired,
  maxTimeIndex: PropTypes.number.isRequired,
  currentTime: PropTypes.instanceOf(moment).isRequired,
  timestamps: PropTypes.instanceOf(List).isRequired,
  timeZoneName: PropTypes.string.isRequired,
  altitudes: PropTypes.instanceOf(List).isRequired,
  currentAltitude: PropTypes.number.isRequired,
  altitudeUnit: PropTypes.string.isRequired,
  altitudeUnitAbbreviation: PropTypes.string.isRequired,
  availableAltitudeUnits: PropTypes.instanceOf(List).isRequired,
  altitudeSource: PropTypes.string.isRequired,
  availableAltitudeSources: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const timeIndex = state.time.get(keys.TIME_INDEX);
  const props = {
    timeIndex,
    maxTimeIndex: state.time.get(keys.MAX_TIME_INDEX),
    timestamps: state.time.get(keys.TIMESTAMPS),
    currentTime: state.time.get(keys.CURRENT_TIMESTAMP),
    timeZoneName: state.time.get(keys.TIME_ZONE_NAME),
    altitudes: state.altitude.get(keys.ALTITUDES),
    currentAltitude: state.altitude.getIn([keys.ALTITUDES, timeIndex]),
    altitudeUnit: state.altitude.get(keys.ALTITUDE_UNIT),
    altitudeUnitAbbreviation: state.altitude.get(keys.ALTITUDE_UNIT_ABBREVIATION),
    availableAltitudeUnits: state.altitude.get(keys.AVAILABLE_ALTITUDE_UNITS),
    altitudeSource: state.altitude.get(keys.ALTITUDE_SOURCE),
    availableAltitudeSources: state.altitude.get(keys.AVAILABLE_ALTITUDE_SOURCES)
  };

  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarogramPage);
