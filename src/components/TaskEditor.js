import React, {PropTypes} from 'react';
import MapDisplay from './MapDisplay';

class TaskEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const task = this.props.task;
    return (
      <MapDisplay task={task} />
    );
  }
}

TaskEditor.propTypes = {
  task: PropTypes.array.isRequired
};

export default TaskEditor;
