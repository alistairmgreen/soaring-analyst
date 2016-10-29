import React, { PropTypes } from 'react';
import { List } from 'immutable';
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
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.flightPath !== this.props.flightPath) {
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

  render() {
    return (
      <GoogleMap googlemaps={global.google.maps} defaultLocation={this.state.defaultLocation} >

        {this.props.currentPosition && <Marker position={this.props.currentPosition} autoScroll label={icons.UNICODE_PLANE} />}

        {this.props.flightPath && <Polyline path={this.props.flightPath} color="blue" />}

        {this.props.task && this.props.task.count() > 0 &&
          <TaskPlot task={this.props.task} />
        }
      </GoogleMap>
    );
  }
}

FlightMap.propTypes = {
  flightPath: PropTypes.instanceOf(List),
  currentPosition: PropTypes.object,
  task: PropTypes.instanceOf(List)
};

export default FlightMap;
