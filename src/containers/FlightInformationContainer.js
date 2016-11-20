import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { List } from 'immutable';
import LoadingDialog from '../components/loggertrace/LoadingDialog';
import StartupBanner from '../components/loggertrace/StartupBanner';
import FlightInformationPage from '../components/pages/FlightInformationPage';
import { loadFile } from '../actions/actions';
import * as keys from '../constants/StateKeys';

function FlightInformationContainer(props) {
  if (props.fileLoadInProgress) {
    return (
      <LoadingDialog fileName={props.fileName} />
    );
  }

  if (props.fileLoaded) {
    return (
      <FlightInformationPage fileName={props.fileName} flightDate={props.flightDate} timezone={props.timezone} headers={props.headers}/>
    );
  }

  return (
    <StartupBanner loadFile={props.loadFile} errorMessage={props.errorMessage} />
  );
}

FlightInformationContainer.propTypes = {
  fileLoadInProgress: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
  fileLoaded: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  flightDate: PropTypes.instanceOf(moment),
  headers: PropTypes.instanceOf(List),
  timezone: PropTypes.string.isRequired,
  loadFile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { loggerTrace, time } = state;

  const props = {
    fileLoadInProgress: loggerTrace.get(keys.FILE_LOAD_IN_PROGRESS),
    fileName: loggerTrace.get(keys.FILE_NAME),
    fileLoaded: loggerTrace.get(keys.FILE_LOADED),
    errorMessage: loggerTrace.get(keys.ERROR_MESSAGE),
    headers: loggerTrace.get(keys.HEADERS),
    flightDate: time.getIn([keys.TIMESTAMPS, 0]),
    timezone: time.get(keys.TIME_ZONE_NAME)
  };

  return props;
}

export default connect(mapStateToProps, { loadFile })(FlightInformationContainer);
