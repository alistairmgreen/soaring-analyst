import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { List } from 'immutable';
import LoadingDialog from '../components/loggertrace/LoadingDialog';
import StartupBanner from '../components/loggertrace/StartupBanner';
import FlightInformationPage from '../components/pages/FlightInformationPage';
import { loadFile } from '../actions/actions';
import * as STATUS from '../constants/loadingStatus';

function FlightInformationContainer(props) {
  switch (props.loadingStatus) {
    case STATUS.LOAD_IN_PROGRESS:
      return (
        <LoadingDialog fileName={props.fileName} />
      );

    case STATUS.FILE_LOADED:
      return (
        <FlightInformationPage fileName={props.fileName} flightDate={props.flightDate} timezone={props.timezone} headers={props.headers} />
      );

    default:
      return (
        <StartupBanner loadFile={props.loadFile} errorMessage={props.errorMessage} />
      );
  }
}

FlightInformationContainer.propTypes = {
  loadingStatus: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  flightDate: PropTypes.instanceOf(moment),
  headers: PropTypes.instanceOf(List),
  timezone: PropTypes.string.isRequired,
  loadFile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loadingStatus: state.loadingStatus,
    fileName: state.fileName,
    errorMessage: state.errorMessage,
    headers: state.headers,
    flightDate: state.timestamps.get(0),
    timezone: state.timeZone
  };
}

export default connect(mapStateToProps, { loadFile })(FlightInformationContainer);
