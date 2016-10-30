import React, {PropTypes} from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import FlightMap from './googlemap/FlightMap';
import TaskDisplay from './TaskDisplay';
import * as TASK_STATE from '../constants/TaskStateKeys';

class TaskEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const task = this.props.task;
    const waypoints = task.get(TASK_STATE.WAYPOINTS);
    const defaultMapLocation = task.get(TASK_STATE.DEFAULT_MAP_LOCATION);
    const deleteTurnpoint = this.props.deleteTurnpoint;

    return (
      <Grid fluid>
        <Row>
          <Col xs={11} sm={12} md={8}>
            <FlightMap defaultLocation={defaultMapLocation}
              task={waypoints}
              zoomToFitLabel="Task" />
          </Col>
          <Col xs={12} mdHidden lgHidden>
            &nbsp;
          </Col>
          <Col xs={11} sm={12} md={4}>
            <Panel header="Task">
              <TaskDisplay task={waypoints} deleteTurnpoint={deleteTurnpoint} />
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

TaskEditor.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTurnpoint: PropTypes.func.isRequired
};

export default TaskEditor;
