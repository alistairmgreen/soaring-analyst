import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import LoadingDialog from '../components/loggertrace/LoadingDialog';
import StartupBanner from '../components/loggertrace/StartupBanner';
import CombinedViewPage from '../components/pages/CombinedViewPage';
import { setTimeIndex, setAltitudeSource, setAltitudeUnit, loadFile } from '../actions/actions';
import * as keys from '../constants/StateKeys';

function CombinedViewPageContainer(props) {
  let trace = props.loggerTrace;

    if(trace.get(keys.FILE_LOAD_IN_PROGRESS)) {
      return (
        <LoadingDialog fileName={trace.get(keys.FILE_NAME)} />
      );
    }

    if(trace.get(keys.FILE_LOADED)) {
      return (
        <CombinedViewPage task={props.task}
                    loggerTrace={props.loggerTrace}
                    time={props.time}
                    altitude={props.altitude}
                    setTimeIndex={props.setTimeIndex}
                    setAltitudeSource={props.setAltitudeSource}
                    setAltitudeUnit={props.setAltitudeUnit}/>
      );
    }

    let errorMessage = props.loggerTrace.get(keys.ERROR_MESSAGE);

    return (
      <StartupBanner loadFile={props.loadFile} errorMessage={errorMessage} />
    );
}

CombinedViewPageContainer.propTypes = {
  task: PropTypes.instanceOf(Map).isRequired,
  loggerTrace: PropTypes.instanceOf(Map).isRequired,
  altitude: PropTypes.instanceOf(Map).isRequired,
  time: PropTypes.instanceOf(Map).isRequired,
  setTimeIndex: PropTypes.func.isRequired,
  setAltitudeSource: PropTypes.func.isRequired,
  setAltitudeUnit: PropTypes.func.isRequired,
  loadFile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    task: state.task,
    loggerTrace: state.loggerTrace,
    time: state.time,
    altitude: state.altitude
  };
}

export default connect(mapStateToProps, { setTimeIndex, setAltitudeSource, setAltitudeUnit, loadFile })(CombinedViewPageContainer);
