import React, { PropTypes } from 'react';
import HeaderDisplay from './HeaderDisplay';
import * as keys from '../../constants/StateKeys';

function LoggerTraceDisplay(props) {
  const trace = props.loggerTrace;
  const fileName = trace.get(keys.FILE_NAME);
  const headers = trace.get(keys.HEADERS);
  const firstTimestamp = trace.getIn(['timestamps', 0]);

  return (
    <div>
      <h1> {fileName} </h1>

      <HeaderDisplay headers={headers} flightDate={firstTimestamp} />
    </div>
  );
}

LoggerTraceDisplay.propTypes = {
  loggerTrace: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default LoggerTraceDisplay;
