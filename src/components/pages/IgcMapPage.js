import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import FlightMap from '../googlemap/FlightMap';
import Timeline from '../timeline/Timeline';
import * as keys from '../../constants/StateKeys';
import * as TASK_STATE from '../../constants/TaskStateKeys';

class IgcMapPage extends React.Component {
  render() {

    const { task, loggerTrace, currentPosition } = this.props;

    return (
      <div>
        <Timeline  />

        <FlightMap flightPath={loggerTrace.get(keys.POSITIONS)}
          currentPosition={currentPosition}
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
  currentPosition: PropTypes.object.isRequired
};

export default IgcMapPage;
