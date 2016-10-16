import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import MenuBar from './MenuBar';

function App(props) {
  return (
    <div>
      <MenuBar fileLoaded={props.fileLoaded} fileName={props.fileName} />
      {props.children}
    </div>
  );
}

App.propTypes = {
  fileName: PropTypes.string,
  fileLoaded: PropTypes.bool.isRequired,
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    fileName: state.loggerTrace.get('fileName'),
    fileLoaded: state.loggerTrace.get('fileLoaded')
  };
}

export default connect(mapStateToProps)(App);
