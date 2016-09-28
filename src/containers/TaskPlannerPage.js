import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskEditor from '../components/TaskEditor';
import * as actions from '../actions/actions';

export function TaskPlannerPage(props) {

  return (
    <div>
      <TaskEditor task={props.task} deleteTurnpoint={props.actions.deleteTurnpoint} />
    </div>
  );
}

TaskPlannerPage.propTypes = {
  task: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    task: state.task
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPlannerPage);
