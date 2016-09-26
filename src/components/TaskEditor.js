import React, {PropTypes} from 'react';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import MapDisplay from './MapDisplay';

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
            <Well>Turnpoint list here</Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}

TaskEditor.propTypes = {
  task: PropTypes.array.isRequired
};

export default TaskEditor;
