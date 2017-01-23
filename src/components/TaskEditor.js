import React, {PropTypes} from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { List, Map } from 'immutable';
import FlightMap from './googlemap/FlightMap';
import TaskDisplay from './TaskDisplay';

class TaskEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      task,
      defaultMapLocation,
      deleteTurnpoint
    } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col xs={11} sm={12} md={8}>
            <FlightMap defaultLocation={defaultMapLocation}
              task={task}
              zoomToFitLabel="Task" />
          </Col>
          <Col xs={12} mdHidden lgHidden>
            &nbsp;
          </Col>
          <Col xs={11} sm={12} md={4}>
            <Panel header="Task">
              <TaskDisplay task={task} deleteTurnpoint={deleteTurnpoint} />
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

TaskEditor.propTypes = {
  task: PropTypes.instanceOf(List).isRequired,
  defaultMapLocation: PropTypes.instanceOf(Map).isRequired,
  deleteTurnpoint: PropTypes.func.isRequired
};

export default TaskEditor;
