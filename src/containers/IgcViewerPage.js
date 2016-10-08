import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import IgcViewer from '../components/IgcViewer';
import * as actions from '../actions/actions';

export function IgcViewerPage(props) {

  return (
    <div>
      <IgcViewer task={props.task} actions={props.actions} />
    </div>
  );
}

IgcViewerPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IgcViewerPage);
