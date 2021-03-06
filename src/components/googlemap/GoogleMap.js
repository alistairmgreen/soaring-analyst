import React, { PropTypes } from 'react';

class GoogleMap extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const gmaps = this.props.googlemaps;

    const location = this.props.defaultLocation;
    const center = location.center || { lat: 0, lng: 0 };
    const zoom = location.zoom || 10;

    this.map = new gmaps.Map(this.mapDiv, {
      center,
      zoom,
      mapTypeId: gmaps.MapTypeId.TERRAIN,
      streetViewControl: false,
      scaleControl: true
    });

    if (location.bounds) {
      this.map.fitBounds(location.bounds);
    }

    this.forceUpdate(); // Ensures that children get re-rendered after the map becomes available.
  }

  componentDidUpdate(prevProps) {
    let location = this.props.defaultLocation;
    if (prevProps.defaultLocation !== location) {
      if (location.center) {
        this.map.panTo(location.center);
      }

      if (location.zoom) {
        this.map.setZoom(location.zoom);
      }

      if (location.bounds) {
        this.map.fitBounds(location.bounds);
      }
    }
  }

  renderChildren() {
    const {children} = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        googlemaps: this.props.googlemaps
      });
    });
  }

  render() {
    return (
      <div ref={map => this.mapDiv = map} style={{ width: "100%", height: "90vh" }}>
        {this.renderChildren()}
      </div >
    );
  }
}

GoogleMap.propTypes = {
  googlemaps: PropTypes.object.isRequired,
  defaultLocation: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
};

export default GoogleMap;
