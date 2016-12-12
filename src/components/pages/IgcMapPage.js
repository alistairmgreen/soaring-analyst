import React, { PropTypes } from 'react';
import { Map, List } from 'immutable';
import FlightMap from '../googlemap/FlightMap';
import Timeline from '../timeline/Timeline';
import * as TASK_STATE from '../../constants/TaskStateKeys';

class IgcMapPage extends React.Component {
  render() {

    const { task, defaultMapLocation, positions, currentPosition } = this.props;

    return (
      <div>
        <Timeline  />

        <FlightMap flightPath={positions}
          currentPosition={currentPosition}
          task={task.get(TASK_STATE.WAYPOINTS)}
          defaultLocation={defaultMapLocation}
          zoomToFitLabel="Flight path" />
      </div>
    );
  }
}

IgcMapPage.propTypes = {
  task: PropTypes.instanceOf(Map).isRequired,
  positions: PropTypes.instanceOf(List).isRequired,
  defaultMapLocation: PropTypes.instanceOf(Map).isRequired,
  currentPosition: PropTypes.object.isRequired
};

export default IgcMapPage;
