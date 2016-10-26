import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

class GoogleMap extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const gmaps = this.props.googlemaps;
    const mapDiv = ReactDOM.findDOMNode(this.refs.map);

    const location = this.props.defaultLocation;

    const center = new gmaps.LatLng(
      location.lat || 0,
      location.lng || 0);

    const zoom = location.zoom || 10;

    this.map = new gmaps.Map(mapDiv, { center, zoom });
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
      <div ref="map" style={{ width: "100%", height: "90vh" }}>
        {this.renderChildren()}
      </div >
    );
  }
}

GoogleMap.propTypes = {
  googlemaps: PropTypes.object.isRequired,
  defaultLocation: PropTypes.object.isRequired,
  children: PropTypes.element
};

export default GoogleMap;
