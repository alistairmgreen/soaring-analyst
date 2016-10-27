import React, { PropTypes } from 'react';
import { List } from 'immutable';

class Polyline extends React.Component {
   constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const gmaps = this.props.googlemaps;

    this.polyline = new gmaps.Polyline({
      path: this.props.path.toArray(),
      map: this.props.map,
      clickable: false,
      strokeColor: 'blue',
      strokeWeight: 1
    });
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.map !== nextProps.map) ||
      (this.props.path !== nextProps.path);
  }

  componentDidUpdate(prevProps) {
    const map = this.props.map;
    if (prevProps.map !== map) {
      this.polyline.setMap(map);
    }

    const path = this.props.path;
    if (path !== prevProps.path) {
      this.polyline.setPath(path);
    }
  }

  componentWillUnmount() {
    if (this.polyline) {
      this.polyline.setMap(null);
    }
  }

  render() {
    return null;
  }
}

Polyline.propTypes = {
  googlemaps: PropTypes.object.isRequired,
  map: PropTypes.object,
  path: PropTypes.instanceOf(List).isRequired
};

export default Polyline;
