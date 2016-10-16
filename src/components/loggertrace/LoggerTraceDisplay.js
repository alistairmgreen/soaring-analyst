import React, { PropTypes } from 'react';
import { Form, FormGroup, ControlLabel } from 'react-bootstrap';
import IGCFilePicker from '../IGCFilePicker';
import HeaderDisplay from './HeaderDisplay';

function LoggerTraceDisplay(props) {
  const trace = props.loggerTrace;
  const fileName = trace.get('fileName');
  const headers = trace.get('headers');
  const firstTimestamp = trace.getIn(['timestamps', 0]);

  return (
    <div>
      <h1> {fileName} </h1>
      <Form inline>
        <FormGroup controlId="igcFileSelector">
          <ControlLabel>Click to open another file: </ControlLabel>
          <IGCFilePicker onChooseFile={props.actions.loadFile} />
        </FormGroup>
      </Form>

      <HeaderDisplay headers={headers} flightDate={firstTimestamp} />
    </div>
  );
}

LoggerTraceDisplay.propTypes = {
  loggerTrace: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default LoggerTraceDisplay;
