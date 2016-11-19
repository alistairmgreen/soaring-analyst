import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import LoadingDialog from '../components/loggertrace/LoadingDialog';
import StartupBanner from '../components/loggertrace/StartupBanner';
import IgcMapPage from '../components/pages/IgcMapPage';
import * as actionCreators from '../actions/actions';
import * as keys from '../constants/StateKeys';

function IgcMapPageContainer(props) {
  let trace = props.loggerTrace;

    if(trace.get(keys.FILE_LOAD_IN_PROGRESS)) {
      return (
        <LoadingDialog fileName={trace.get(keys.FILE_NAME)} />
      );
    }

    if(trace.get(keys.FILE_LOADED)) {
      return (
        <IgcMapPage task={props.task}
                    loggerTrace={props.loggerTrace}
                    time={props.time}
                    altitude={props.altitude}
                    setTimeIndexAction={props.actions.setTimeIndex}/>
      );
    }

    let errorMessage = props.loggerTrace.get(keys.ERROR_MESSAGE);

    return (
      <StartupBanner loadFile={props.actions.loadFile} errorMessage={errorMessage} />
    );
}

IgcMapPageContainer.propTypes = {
  task: PropTypes.instanceOf(Map).isRequired,
  loggerTrace: PropTypes.instanceOf(Map).isRequired,
  altitude: PropTypes.instanceOf(Map).isRequired,
  time: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    task: state.task,
    loggerTrace: state.loggerTrace,
    time: state.time,
    altitude: state.altitude
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IgcMapPageContainer);
