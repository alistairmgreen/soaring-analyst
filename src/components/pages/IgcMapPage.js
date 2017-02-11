import React, { PropTypes } from 'react';
import { Map, List } from 'immutable';
import FlightMap from '../googlemap/FlightMap';
import Timeline from '../timeline/Timeline';

class IgcMapPage extends React.Component {
  render() {

    const { task, defaultMapLocation, positions, currentPosition, googlemaps } = this.props;

    return (
      <div>
        <Timeline  />

        <FlightMap
          googlemaps={googlemaps}
          flightPath={positions}
          currentPosition={currentPosition}
          task={task}
          defaultLocation={defaultMapLocation}
          zoomToFitLabel="Flight path" />
      </div>
    );
  }
}

IgcMapPage.propTypes = {
  task: PropTypes.instanceOf(List).isRequired,
  positions: PropTypes.instanceOf(List).isRequired,
  defaultMapLocation: PropTypes.instanceOf(Map).isRequired,
  currentPosition: PropTypes.object.isRequired,
  googlemaps: PropTypes.object
};

export default IgcMapPage;
