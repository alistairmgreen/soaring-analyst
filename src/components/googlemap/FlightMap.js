import React, { PropTypes } from 'react';
import { List } from 'immutable';
import GoogleMap from './GoogleMap';
import * as icons from './icons';
import Marker from './Marker';
import Polyline from './Polyline';
import TaskPlot from './TaskPlot';

function FlightMap(props) {

  return (
    <GoogleMap googlemaps={global.google.maps} defaultLocation={props.defaultLocation} >

      {props.currentPosition && <Marker position={props.currentPosition} autoScroll label={icons.UNICODE_PLANE} />}

      {props.flightPath && <Polyline path={props.flightPath} color="blue" />}

      { props.task && props.task.count() > 0 &&
        <TaskPlot task={props.task} />
      }
    </GoogleMap>
  );
}

FlightMap.propTypes = {
  defaultLocation: PropTypes.object.isRequired,
  flightPath: PropTypes.instanceOf(List),
  currentPosition: PropTypes.object,
  task: PropTypes.instanceOf(List)
};

export default FlightMap;
