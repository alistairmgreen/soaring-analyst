import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import LoadingDialog from '../components/loggertrace/LoadingDialog';
import StartupBanner from '../components/loggertrace/StartupBanner';
import CombinedViewPage from '../components/pages/CombinedViewPage';
import { loadFile } from '../actions/actions';
import * as STATUS from '../constants/loadingStatus';
import { getCurrentPosition, getDefaultFlightMapPosition } from '../selectors/positionSelectors';

function CombinedViewPageContainer(props) {
  switch (props.loadingStatus) {
    case STATUS.LOAD_IN_PROGRESS:
      return (
        <LoadingDialog fileName={props.fileName} />
      );

    case STATUS.FILE_LOADED:
      return (
        <CombinedViewPage task={props.task}
          defaultMapLocation={props.defaultMapLocation}
          positions={props.positions}
          currentPosition={props.currentPosition} />
      );

    default:
      return (
        <StartupBanner loadFile={props.loadFile} errorMessage={props.errorMessage} />
      );
  }
}

CombinedViewPageContainer.propTypes = {
  loadingStatus: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  task: PropTypes.instanceOf(Map).isRequired,
  positions: PropTypes.instanceOf(List).isRequired,
  defaultMapLocation: PropTypes.instanceOf(Map).isRequired,
  loadFile: PropTypes.func.isRequired,
  currentPosition: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const props = {
    loadingStatus: state.loadingStatus,
    fileName: state.fileName,
    errorMessage: state.errorMessage,
    task: state.task,
    positions: state.positions,
    defaultMapLocation: getDefaultFlightMapPosition(state),
    currentPosition: getCurrentPosition(state)
  };

  return props;
}

export default connect(mapStateToProps, { loadFile })(CombinedViewPageContainer);
