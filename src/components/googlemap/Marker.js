import React, { PropTypes } from 'react';

class Marker extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const gmaps = this.props.googlemaps;
    let latlng = this.props.position.toObject();
    this.marker = new gmaps.Marker({ position: latlng });
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.map !== nextProps.map) ||
      (this.props.position !== nextProps.position);
  }

  componentDidUpdate(prevProps) {
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

  render() {
    return null;
  }
}

Marker.propTypes = {
  googlemaps: PropTypes.object.isRequired,
  map: PropTypes.object,
  position: PropTypes.object.isRequired,
  autoScroll: PropTypes.bool
};

export default Marker;
