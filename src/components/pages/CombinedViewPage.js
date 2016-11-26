import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { Grid, Row, Col } from 'react-bootstrap';
import FlightMap from '../googlemap/FlightMap';
import Timeline from '../timeline/Timeline';
import Barogram from '../charts/Barogram';
import AltitudeSelector from '../AltitudeSelector';
import * as keys from '../../constants/StateKeys';
import * as TASK_STATE from '../../constants/TaskStateKeys';

class CombinedViewPage extends React.Component {
  render() {

    const {
      task,
      loggerTrace
    } = this.props;

    const currentPosition = loggerTrace.get(keys.CURRENT_POSITION);

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Timeline />
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6}>
            <FlightMap flightPath={loggerTrace.get(keys.POSITIONS)}
              currentPosition={currentPosition}
              task={task.get(TASK_STATE.WAYPOINTS)}
              defaultLocation={loggerTrace.get(keys.DEFAULT_MAP_LOCATION)}
              zoomToFitLabel="Flight path" />
          </Col>
          <Col sm={12} md={6}>
            <AltitudeSelector />

            <Barogram />
          </Col>
        </Row>
      </Grid>
    );
  }
}

CombinedViewPage.propTypes = {
  task: PropTypes.instanceOf(Map).isRequired,
  loggerTrace: PropTypes.instanceOf(Map).isRequired,
};

export default CombinedViewPage;
