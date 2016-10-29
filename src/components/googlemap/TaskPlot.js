import React, { PropTypes } from 'react';
import { List } from 'immutable';
import Polyline from './Polyline';
import Marker from './Marker';

class TaskPlot extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (this.props.map !== nextProps.map) ||
      (this.props.googlemaps !== nextProps.googlemaps) ||
      (this.props.task !== nextProps.task);
  }

  render() {
    const { task, googlemaps, map } = this.props;
    const positions = task.map(waypoint => waypoint.get('position'));

    let markers = positions.map((pos, index) =>
      <Marker googlemaps={googlemaps} map={map} position={pos} key={index} />)
      .toArray();

    return (
      <span>
        <Polyline googlemaps={googlemaps} map={map} path={positions} />

        {markers}
      </span>
    );
  }
}

TaskPlot.propTypes = {
  task: PropTypes.instanceOf(List),
  map: PropTypes.object,
  googlemaps: PropTypes.object
};

export default TaskPlot;
