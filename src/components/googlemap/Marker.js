import React, { PropTypes } from 'react';

class Marker extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.createMarker();
  }

  componentDidUpdate(prevProps) {
    if (this.props.googlemaps !== prevProps.googlemaps) {
      this.createMarker();
    }

    if(!this.marker) {
      return;
    }

    const map = this.props.map;
    if (prevProps.map !== map) {
      this.marker.setMap(map);
    }

    const position = this.props.position;
    if (prevProps.position !== position) {
      let latlng = position.toObject();
      this.marker.setPosition(latlng);
      if (this.props.autoScroll &&
        !map.getBounds().contains(latlng)) {
        map.panTo(latlng);
      }
    }
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  createMarker() {
    if (this.props.googlemaps && !this.marker) {
      const gmaps = this.props.googlemaps;

      let options = {
        position: this.props.position.toObject(),
        clickable: false
      };

      if (this.props.label) {
        options.label = this.props.label;
      }

      this.marker = new gmaps.Marker(options);
    }
  }

  render() {
    return null;
  }
}

Marker.propTypes = {
  googlemaps: PropTypes.object,
  map: PropTypes.object,
  position: PropTypes.object.isRequired,
  autoScroll: PropTypes.bool,
  label: PropTypes.string
};

export default Marker;
