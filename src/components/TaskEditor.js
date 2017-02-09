import React, {PropTypes} from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

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
