import React, { PropTypes } from 'react';
import { Form, FormGroup, ControlLabel } from 'react-bootstrap';
import IGCFilePicker from '../IGCFilePicker';
import HeaderDisplay from './HeaderDisplay';

function LoggerTraceDisplay(props) {
  let trace = props.loggerTrace;
  let fileName = trace.get('fileName');
  let headers = trace.get('headers');

  return (
    <div>
      <h1> {fileName} </h1>
      <Form inline>
        <FormGroup controlId="igcFileSelector">
          <ControlLabel>Click to open another file: </ControlLabel>
          <IGCFilePicker onChooseFile={props.actions.loadFile} />
        </FormGroup>
      </Form>

      <HeaderDisplay headers={headers} />
    </div>
  );
}

LoggerTraceDisplay.propTypes = {
  loggerTrace: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default LoggerTraceDisplay;