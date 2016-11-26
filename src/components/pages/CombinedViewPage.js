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
      altitude,
      task,
      loggerTrace,
      setAltitudeSource,
      setAltitudeUnit
    } = this.props;

    const altitudeUnit = altitude.get(keys.ALTITUDE_UNIT);
    const altitudeSource = altitude.get(keys.ALTITUDE_SOURCE);
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
          <AltitudeSelector currentSource={altitudeSource}
          altitudeSources={altitude.get(keys.AVAILABLE_ALTITUDE_SOURCES)}
          onSourceChanged={setAltitudeSource}
          unit={altitudeUnit}
          availableUnits={altitude.get(keys.AVAILABLE_ALTITUDE_UNITS)}
          onUnitChanged={setAltitudeUnit} />

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
  altitude: PropTypes.instanceOf(Map).isRequired,
  setAltitudeSource: PropTypes.func.isRequired,
  setAltitudeUnit: PropTypes.func.isRequired
};

export default CombinedViewPage;
