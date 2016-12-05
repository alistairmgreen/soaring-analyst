import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import { FILE_LOADED } from '../constants/loadingStatus';

import MenuBar from './MenuBar';

function App(props) {
  return (
    <div>
      <MenuBar fileLoaded={props.fileLoaded} fileName={props.fileName} loadFileAction={props.actions.loadFile} />
      {props.children}
    </div>
  );
}

App.propTypes = {
  fileName: PropTypes.string,
  fileLoaded: PropTypes.bool.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    fileName: state.fileName,
    fileLoaded: state.loadingStatus == FILE_LOADED
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
