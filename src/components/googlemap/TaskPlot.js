import React, { PropTypes } from 'react';
import { List } from 'immutable';
import Polyline from './Polyline';
import Marker from './Marker';
import * as icons from './icons';

class TaskPlot extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (this.props.map !== nextProps.map) ||
      (this.props.googlemaps !== nextProps.googlemaps) ||
      (this.props.task !== nextProps.task);
  }

  render() {
    const { task, googlemaps, map } = this.props;
    const positions = task.map(waypoint => waypoint.get('position'));
    const lastIndex = positions.count() - 1;

    let markers = positions.map((pos, index) => {
      let markerLabel;
      switch (index) {
        case lastIndex:
          markerLabel = icons.UNICODE_CHEQUERED_FLAG;
          break;
        case 0:
          markerLabel = 'S';
          break;
        default:
          markerLabel = index.toString();
      }

      return (<Marker googlemaps={googlemaps} map={map} position={pos.toObject()} label={markerLabel} key={index} />);
    }).toArray();

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
