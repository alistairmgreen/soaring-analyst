import React, {PropTypes} from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import MapDisplay from './MapDisplay';
import TaskDisplay from './TaskDisplay';

class TaskEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const task = this.props.task;
    const deleteTurnpoint = this.props.deleteTurnpoint;
    let firstTurnpointLatLng = { lat: 51.9203333333333, lng: -1.13141666666667 };

    return (
      <Grid fluid>
        <Row>
          <Col xs={11} sm={12} md={8}>
            <MapDisplay task={task} defaultCenter={firstTurnpointLatLng} />
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
  task: PropTypes.object.isRequired,
  deleteTurnpoint: PropTypes.func.isRequired
};

export default TaskEditor;
