import React, { PropTypes } from 'react';
import HeaderDisplay from './HeaderDisplay';

function LoggerTraceDisplay(props) {
  const trace = props.loggerTrace;
  const fileName = trace.get('fileName');
  const headers = trace.get('headers');
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
