import React, {PropTypes} from 'react';

class TaskEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const task = this.props.task;
    return (
      <ol>
        { task.map((turnpoint, index) => <li key={index}>{turnpoint.name}</li>) }
      </ol>
    );
  }
}

TaskEditor.propTypes = {
  task: PropTypes.array.isRequired
};

export default TaskEditor;
