import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as STATUS from '../constants/loadingStatus';
import LoadingDialog from '../components/loggertrace/LoadingDialog';
import StartupBanner from '../components/loggertrace/StartupBanner';
import BarogramPage from '../components/pages/BarogramPage';
import { loadFile } from '../actions/actions';

function BarogramPageContainer(props) {
  switch (props.loadingStatus) {
    case STATUS.LOAD_IN_PROGRESS:
      return (<LoadingDialog fileName={props.fileName} />);

    case STATUS.FILE_LOADED:
      return (<BarogramPage />);

    default:
      return (
        <StartupBanner loadFile={props.loadFile} errorMessage={props.errorMessage} />
      );
  }
}

BarogramPageContainer.propTypes = {
  loadingStatus: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  loadFile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loadingStatus: state.loadingStatus,
    fileName: state.fileName,
    errorMessage: state.errorMessage
  };
}

export default connect(mapStateToProps, { loadFile })(BarogramPageContainer);
