import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import IgcViewer from '../components/IgcViewer';
import * as actions from '../actions/actions';
import * as keys from '../constants/StateKeys';
import * as TASK_STATE from '../constants/TaskStateKeys';

export function IgcViewerPage(props) {

  return (
    <div>
      <IgcViewer task={props.task} loggerTrace={props.loggerTrace} timestamps={props.timestamps} actions={props.actions} />
    </div>
  );
}

IgcViewerPage.propTypes = {
  task: PropTypes.object.isRequired,
  loggerTrace: PropTypes.object.isRequired,
  timestamps: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    task: state.task.get(TASK_STATE.WAYPOINTS),
    timestamps: state.time.get(keys.TIMESTAMPS),
    loggerTrace: state.loggerTrace
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IgcViewerPage);
