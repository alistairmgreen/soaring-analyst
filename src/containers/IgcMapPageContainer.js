import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import LoadingDialog from '../components/loggertrace/LoadingDialog';
import StartupBanner from '../components/loggertrace/StartupBanner';
import IgcMapPage from '../components/pages/IgcMapPage';
import { loadFile } from '../actions/actions';
import * as keys from '../constants/StateKeys';
import * as STATUS from '../constants/loadingStatus';

function IgcMapPageContainer(props) {
  switch (props.loadingStatus) {
    case STATUS.LOAD_IN_PROGRESS:
      return (
        <LoadingDialog fileName={props.fileName} />
      );

    case STATUS.FILE_LOADED:
      return (
        <IgcMapPage task={props.task} loggerTrace={props.loggerTrace} />
      );

    default:
      return (
        <StartupBanner loadFile={props.loadFile} errorMessage={props.errorMessage} />
      );
  }
}

IgcMapPageContainer.propTypes = {
  loadingStatus: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  task: PropTypes.instanceOf(Map).isRequired,
  loggerTrace: PropTypes.instanceOf(Map).isRequired,
  loadFile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loadingStatus: state.loadingStatus,
    fileName: state.loggerTrace.get(keys.FILE_NAME),
    errorMessage: state.loggerTrace.get(keys.ERROR_MESSAGE),
    task: state.task,
    loggerTrace: state.loggerTrace
  };
}

export default connect(mapStateToProps, { loadFile })(IgcMapPageContainer);
