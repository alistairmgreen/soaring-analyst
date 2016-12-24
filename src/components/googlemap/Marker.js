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
      this.marker.setPosition(position);
      if (this.props.autoScroll &&
        !map.getBounds().contains(position)) {
        map.panTo(position);
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
        position: this.props.position,
        clickable: false
      };

      if (this.props.label) {
        options.label = this.props.label;
      }

      this.marker = new gmaps.Marker(options);

      if(this.props.map) {
        this.marker.setMap(this.props.map);
      }
    }
  }

  render() {
    return <span/>;
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
