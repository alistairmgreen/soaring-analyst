import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import LoadingDialog from '../components/loggertrace/LoadingDialog';
import StartupBanner from '../components/loggertrace/StartupBanner';
import IgcMapPage from '../components/pages/IgcMapPage';
import { loadFile } from '../actions/actions';
import * as STATUS from '../constants/loadingStatus';
import { getCurrentPosition, getDefaultFlightMapPosition } from '../selectors/positionSelectors';
import { getWaypoints } from '../selectors/taskSelectors';

function IgcMapPageContainer(props) {
  switch (props.loadingStatus) {
    case STATUS.LOAD_IN_PROGRESS:
      return (
        <LoadingDialog fileName={props.fileName} />
      );

    case STATUS.FILE_LOADED:
      return (
        <IgcMapPage googlemaps={props.googlemaps} task={props.task} defaultMapLocation={props.defaultMapLocation} positions={props.positions} currentPosition={props.currentPosition} />
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
  task: PropTypes.instanceOf(List).isRequired,
  positions: PropTypes.instanceOf(List).isRequired,
  defaultMapLocation: PropTypes.instanceOf(Map).isRequired,
  loadFile: PropTypes.func.isRequired,
  currentPosition: PropTypes.object.isRequired,
  googlemaps: PropTypes.object
};

function mapStateToProps(state) {
  return {
    loadingStatus: state.loadingStatus,
    fileName: state.fileName,
    errorMessage: state.errorMessage,
    task: getWaypoints(state),
    positions: state.positions,
    defaultMapLocation: getDefaultFlightMapPosition(state),
    currentPosition: getCurrentPosition(state),
    googlemaps: state.googleMapsApi
  };
}

export default connect(mapStateToProps, { loadFile })(IgcMapPageContainer);
