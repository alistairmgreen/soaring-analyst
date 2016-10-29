import React, { PropTypes } from 'react';
import { List } from 'immutable';

class Polyline extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.createPolyline();
  }

  componentDidUpdate(prevProps) {
    if(this.props.googlemaps !== prevProps.googlemaps) {
      this.createPolyline();
    }

    if(!this.polyline) {
      return;
    }

    const map = this.props.map;
    if (prevProps.map !== map) {
      this.polyline.setMap(map);
    }

    const path = this.props.path;
    if (path !== prevProps.path) {
      this.polyline.setPath(path.toJS());
    }
  }

  componentWillUnmount() {
    if (this.polyline) {
      this.polyline.setMap(null);
    }
  }

  createPolyline() {
    const gmaps = this.props.googlemaps;
    if (gmaps && !this.polyline) {
      this.polyline = new gmaps.Polyline({
        path: this.props.path.toJS(),
        map: this.props.map,
        clickable: false,
        strokeColor: this.props.color || 'black',
        strokeWeight: this.props.weight || 1
      });
    }
  }

  render() {
    return null;
  }
}

Polyline.propTypes = {
  googlemaps: PropTypes.object,
  map: PropTypes.object,
  path: PropTypes.instanceOf(List).isRequired,
  color: PropTypes.string,
  weight: PropTypes.number
};

export default Polyline;
