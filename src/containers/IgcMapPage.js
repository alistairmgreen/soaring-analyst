import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import MapDisplay from '../components/MapDisplay';
import * as actions from '../actions/actions';

export function IgcMapPage(props) {
  let positions = props.loggerTrace.get('positions').toArray();
  let startPoint = positions[0];
  return (
    <div>
      <MapDisplay task={props.task} flightPath={positions} defaultCenter={startPoint} />
    </div>
  );
}

IgcMapPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(IgcMapPage);
