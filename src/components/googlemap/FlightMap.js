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

    const {flightPath} = props;
    let defaultLocation;

    if (flightPath) {
      defaultLocation = {
        bounds: this.calculateBounds(flightPath)
      };
    }
    else {
      defaultLocation = {
        center: { lat: 0, lng: 0 },
        zoom: 1
      };
    }

    this.state = { defaultLocation };

    this.zoomToFlightPath = this.zoomToFlightPath.bind(this);
    this.zoomToWaypoint = this.zoomToWaypoint.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.flightPath !== this.props.flightPath) {
      this.setState({
        defaultLocation: {
          bounds: this.calculateBounds(nextProps.flightPath)
        }
      });
    }
  }

  calculateBounds(flightPath) {
    const firstPoint = flightPath.get(0);
    return flightPath.reduce((previous, current) => {
      return {
        north: Math.max(previous.north, current.lat),
        south: Math.min(previous.south, current.lat),
        west: Math.min(previous.west, current.lng),
        east: Math.max(previous.east, current.lng)
      };
    }, {
        north: firstPoint.lat,
        south: firstPoint.lat,
        west: firstPoint.lng,
        east: firstPoint.lng
      });
  }

  zoomToFlightPath() {
    this.setState((prevState, props) => {
      return {
        defaultLocation: {
          bounds: this.calculateBounds(props.flightPath)
        }
      };
    });
  }

  zoomToWaypoint(index) {
    this.setState((prevState, props) => {
      const waypoint = props.task.get(index);
      return {
        defaultLocation: {
          center: waypoint.get('position').toObject(),
          zoom: 13
        }
      };
    });
  }

  render() {
    return (
      <div>
        <MapToolbar waypointNames={this.props.task.map(waypoint => waypoint.get('name'))}
          zoomToFlightPath={this.zoomToFlightPath}
          zoomToWaypoint={this.zoomToWaypoint} />

        <GoogleMap googlemaps={global.google.maps} defaultLocation={this.state.defaultLocation} >

          {this.props.currentPosition && <Marker position={this.props.currentPosition} autoScroll label={icons.UNICODE_PLANE} />}

          {this.props.flightPath && <Polyline path={this.props.flightPath} color="blue" />}

          {this.props.task && this.props.task.count() > 0 &&
            <TaskPlot task={this.props.task} />
          }
        </GoogleMap>
      </div>
    );
  }
}

FlightMap.propTypes = {
  flightPath: PropTypes.instanceOf(List),
  currentPosition: PropTypes.object,
  task: PropTypes.instanceOf(List)
};

export default FlightMap;
