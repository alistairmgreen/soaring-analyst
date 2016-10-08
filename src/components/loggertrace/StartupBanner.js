import React, { PropTypes } from 'react';
import { Alert, Jumbotron, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import IGCFilePicker from '../IGCFilePicker';

function StartupBanner(props) {
  return (
    <Jumbotron>
      <h1>View a Logger Trace</h1>

      <form>
        <FormGroup controlId="igcFileSelector" bsSize="lg">
          <ControlLabel>
            Choose an IGC file to view:
          </ControlLabel>
          <IGCFilePicker onChooseFile={props.loadFile} />
          <HelpBlock>
            This file will be opened inside your browser; it won't
            be uploaded to the Internet.
          </HelpBlock>
        </FormGroup>
      </form>

      {props.errorMessage && (
        <Alert bsStyle="danger">
          <strong>{props.errorMessage}</strong>
        </Alert>
      ) }
    </Jumbotron>
  );
}

StartupBanner.propTypes = {
  loadFile: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default StartupBanner;
