import React, { PropTypes } from 'react';
import { List } from 'immutable';
import Polyline from './Polyline';
import Marker from './Marker';

function TaskPlot(props) {
  const { task } = props;
  const positions = task.map(waypoint => waypoint.get('position'));

  let markers = positions.map((pos, index) =>
    <Marker googlemaps={props.googlemaps} map={props.map} position={pos} key={index} />)
    .toArray();

  return (
    <span>
      <Polyline googlemaps={props.googlemaps} map={props.map} path={positions} />

      {markers}
    </span>
  );

}

TaskPlot.propTypes = {
  task: PropTypes.instanceOf(List),
  map: PropTypes.object,
  googlemaps: PropTypes.object
};

export default TaskPlot;
