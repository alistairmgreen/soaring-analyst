import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import IgcViewer from '../components/IgcViewer';
import * as actions from '../actions/actions';

export function IgcViewerPage(props) {

  return (
    <div>
      <IgcViewer task={props.task} loggerTrace={props.loggerTrace} actions={props.actions} />
    </div>
  );
}

IgcViewerPage.propTypes = {
  task: PropTypes.object.isRequired,
  loggerTrace: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    task: state.task,
    loggerTrace: state.loggerTrace
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IgcViewerPage);
