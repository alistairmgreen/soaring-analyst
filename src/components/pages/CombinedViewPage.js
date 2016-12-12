import React, { PropTypes } from 'react';
import { Map, List } from 'immutable';
import { Grid, Row, Col } from 'react-bootstrap';
import FlightMap from '../googlemap/FlightMap';
import Timeline from '../timeline/Timeline';
import Barogram from '../charts/Barogram';
import AltitudeChooser from '../AltitudeChooser';
import * as TASK_STATE from '../../constants/TaskStateKeys';

class CombinedViewPage extends React.Component {
  render() {

    const {
      task,
      defaultMapLocation,
      positions,
      currentPosition
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
            <FlightMap flightPath={positions}
              currentPosition={currentPosition}
              task={task.get(TASK_STATE.WAYPOINTS)}
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
  task: PropTypes.instanceOf(Map).isRequired,
  positions: PropTypes.instanceOf(List).isRequired,
  defaultMapLocation: PropTypes.instanceOf(Map).isRequired,
  currentPosition: PropTypes.object.isRequired
};

export default CombinedViewPage;
