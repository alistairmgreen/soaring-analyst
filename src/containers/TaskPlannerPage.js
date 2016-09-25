import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TaskEditor from '../components/TaskEditor';

export function TaskPlannerPage(props) {

  return (
    <div>
      <TaskEditor task={props.task} />
    </div>
  );
}

TaskPlannerPage.propTypes = {
  task: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    task: state.task
  };
}

export default connect(mapStateToProps)(TaskPlannerPage);
