import React, { PropTypes } from 'react';
import { Map, List } from 'immutable';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FlightMap from '../googlemap/FlightMap';
import Timeline from '../timeline/Timeline';
import Barogram from '../charts/Barogram';
import AltitudeChooser from '../AltitudeChooser';

class CombinedViewPage extends React.Component {
  render() {

    const {
      task,
      defaultMapLocation,
      positions,
      currentPosition,
      googlemaps
    } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Timeline />
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6}>
            <FlightMap
              googlemaps={googlemaps}
              flightPath={positions}
              currentPosition={currentPosition}
              task={task}
              defaultLocation={defaultMapLocation}
              zoomToFitLabel="Flight path" />
          </Col>
          <Col sm={12} md={6}>
            <AltitudeChooser />

            <Barogram />
          </Col>
        </Row>
      </Grid>
    );
  }
}

CombinedViewPage.propTypes = {
  task: PropTypes.instanceOf(List).isRequired,
  positions: PropTypes.instanceOf(List).isRequired,
  defaultMapLocation: PropTypes.instanceOf(Map).isRequired,
  currentPosition: PropTypes.object.isRequired,
  googlemaps: PropTypes.object
};

export default CombinedViewPage;
