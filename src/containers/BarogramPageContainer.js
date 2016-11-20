import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import LoadingDialog from '../components/loggertrace/LoadingDialog';
import StartupBanner from '../components/loggertrace/StartupBanner';
import BarogramPage from '../components/pages/BarogramPage';
import { loadFile, setTimeIndex, setAltitudeSource, setAltitudeUnit } from '../actions/actions';
import * as keys from '../constants/StateKeys';

function BarogramPageContainer(props) {
  if (props.fileLoadInProgress) {
    return (
      <LoadingDialog fileName={props.fileName} />
    );
  }

  if (props.fileLoaded) {
    return (
      <BarogramPage altitude={props.altitude}
        time={props.time}
        currentPosition={props.currentPosition}
        setTimeIndex={props.setTimeIndex}
        setAltitudeSource={props.setAltitudeSource}
        setAltitudeUnit={props.setAltitudeUnit} />
    );
  }

  return (
    <StartupBanner loadFile={props.loadFile} errorMessage={props.errorMessage} />
  );
}

BarogramPageContainer.propTypes = {
  fileLoadInProgress: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
  fileLoaded: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Map).isRequired,
  currentPosition: PropTypes.object.isRequired,
  altitude: PropTypes.instanceOf(Map).isRequired,
  setTimeIndex: PropTypes.func.isRequired,
  setAltitudeSource: PropTypes.func.isRequired,
  setAltitudeUnit: PropTypes.func.isRequired,
  loadFile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { loggerTrace, time, altitude } = state;

  return {
    fileLoadInProgress: loggerTrace.get(keys.FILE_LOAD_IN_PROGRESS),
    fileName: loggerTrace.get(keys.FILE_NAME),
    fileLoaded: loggerTrace.get(keys.FILE_LOADED),
    errorMessage: loggerTrace.get(keys.ERROR_MESSAGE),
    time,
    currentPosition: loggerTrace.get(keys.CURRENT_POSITION).toObject(),
    altitude
  };
}

export default connect(mapStateToProps, { loadFile, setTimeIndex, setAltitudeSource, setAltitudeUnit })(BarogramPageContainer);
