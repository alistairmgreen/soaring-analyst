import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import FlightMap from '../googlemap/FlightMap';
import Timeline from '../Timeline';
import * as keys from '../../constants/StateKeys';
import * as TASK_STATE from '../../constants/TaskStateKeys';

class IgcMapPage extends React.Component {
  render() {

    const {
      altitude,
      task,
      loggerTrace,
      time,
      setTimeIndexAction
    } = this.props;

    const timeIndex = time.get(keys.TIME_INDEX);

    return (
      <div>
        <Timeline timeIndex={timeIndex}
          max={time.get(keys.MAX_TIME_INDEX)}
          currentTime={time.getIn([keys.TIMESTAMPS, timeIndex])}
          currentAltitude={altitude.getIn([keys.ALTITUDES, timeIndex])}
          altitudeUnit={altitude.get(keys.ALTITUDE_UNIT_ABBREVIATION)}
          altitudeSource={altitude.get(keys.ALTITUDE_SOURCE)}
          setTimeIndex={setTimeIndexAction} />

        <FlightMap flightPath={loggerTrace.get(keys.POSITIONS)}
          currentPosition={loggerTrace.get(keys.CURRENT_POSITION)}
          task={task.get(TASK_STATE.WAYPOINTS)}
          defaultLocation={loggerTrace.get(keys.DEFAULT_MAP_LOCATION)}
          zoomToFitLabel="Flight path" />
      </div>
    );
  }
}

IgcMapPage.propTypes = {
  task: PropTypes.instanceOf(Map).isRequired,
  loggerTrace: PropTypes.instanceOf(Map).isRequired,
  time: PropTypes.instanceOf(Map).isRequired,
  altitude: PropTypes.instanceOf(Map).isRequired,
  setTimeIndexAction: PropTypes.func.isRequired
};

export default IgcMapPage;
