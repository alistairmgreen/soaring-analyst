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
    return (
      <Grid fluid>
        <Row>
          <Col xs={11} sm={12} md={8}>
            <MapDisplay task={task} />
          </Col>
          <Col xs={12} mdHidden lgHidden>
            &nbsp;
          </Col>
          <Col xs={11} sm={12} md={4}>
            <Panel header="Task">
              <TaskDisplay task={task} />
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

TaskEditor.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskEditor;
