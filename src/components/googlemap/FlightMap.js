import React, { PropTypes } from 'react';
import { List } from 'immutable';
import MapToolbar from './MapToolbar';
import GoogleMap from './GoogleMap';
import * as icons from './icons';
import Marker from './Marker';
import Polyline from './Polyline';
import TaskPlot from './TaskPlot';

class FlightMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      defaultLocation: props.defaultLocation.toJS()
    };

    this.setMapToDefaultLocation = this.setMapToDefaultLocation.bind(this);
    this.zoomToWaypoint = this.zoomToWaypoint.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultLocation !== this.props.defaultLocation) {
      this.setMapToDefaultLocation();
    }
  }

  setMapToDefaultLocation() {
    this.setState((prevState, props) => {
      return {
        defaultLocation: props.defaultLocation.toJS()
      };
    });
  }

  zoomToWaypoint(index) {
    this.setState((prevState, props) => {
      const waypoint = props.task.get(index);
      return {
        defaultLocation: {
          center: waypoint.toObject(),
          zoom: 13
        }
      };
    });
  }

  render() {
    let mapElements = [];

    if (this.props.currentPosition) {
      mapElements.push(<Marker key="Glider position" position={this.props.currentPosition.toObject()} autoScroll label={icons.UNICODE_PLANE} />);
    }

    if (this.props.flightPath) {
      mapElements.push(<Polyline key="Flight path" path={this.props.flightPath} color="blue" />);
    }

    if (this.props.task && this.props.task.count() > 0) {
      mapElements.push(<TaskPlot key="Task" task={this.props.task} />);
    }

    if (this.props.googlemaps) {
      return (
        <div>
          <MapToolbar waypointNames={this.props.task.map(waypoint => waypoint.get('name'))}
            zoomToFit={this.setMapToDefaultLocation}
            zoomToFitLabel={this.props.zoomToFitLabel}
            zoomToWaypoint={this.zoomToWaypoint} />

          <GoogleMap googlemaps={this.props.googlemaps} defaultLocation={this.state.defaultLocation} >
            {mapElements}
          </GoogleMap>
        </div>
      );
    }

    return (<p>Loading map...</p>);
  }
}

FlightMap.propTypes = {
  flightPath: PropTypes.instanceOf(List),
  currentPosition: PropTypes.object,
  task: PropTypes.instanceOf(List),
  defaultLocation: PropTypes.object.isRequired,
  zoomToFitLabel: PropTypes.string.isRequired,
  googlemaps: PropTypes.object
};

export default FlightMap;
