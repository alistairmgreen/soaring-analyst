import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { Grid, Row, Col } from 'react-bootstrap';
import FlightMap from '../googlemap/FlightMap';
import Timeline from '../Timeline';
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
      time,
      setTimeIndex,
      setAltitudeSource,
      setAltitudeUnit
    } = this.props;

    const timeIndex = time.get(keys.TIME_INDEX);
    const currentTime = time.getIn([keys.TIMESTAMPS, timeIndex]);
    const altitudeUnit = altitude.get(keys.ALTITUDE_UNIT);
    const altitudeSource = altitude.get(keys.ALTITUDE_SOURCE);
    const currentPosition = loggerTrace.get(keys.CURRENT_POSITION);

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Timeline timeIndex={timeIndex}
              max={time.get(keys.MAX_TIME_INDEX)}
              currentTime={currentTime}
              currentAltitude={altitude.getIn([keys.ALTITUDES, timeIndex])}
              currentPosition ={currentPosition.toObject()}
              altitudeUnit={altitude.get(keys.ALTITUDE_UNIT_ABBREVIATION)}
              altitudeSource={altitude.get(keys.ALTITUDE_SOURCE)}
              setTimeIndex={setTimeIndex} />
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
  time: PropTypes.instanceOf(Map).isRequired,
  altitude: PropTypes.instanceOf(Map).isRequired,
  setTimeIndex: PropTypes.func.isRequired,
  setAltitudeSource: PropTypes.func.isRequired,
  setAltitudeUnit: PropTypes.func.isRequired
};

export default CombinedViewPage;
