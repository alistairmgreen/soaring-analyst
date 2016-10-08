import React from 'react';
import { Jumbotron, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

function StartupBanner() {
  return (
    <Jumbotron>
      <h1>View a Logger Trace</h1>

      <form>
        <FormGroup controlId="igcFileSelector" bsSize="lg">
          <ControlLabel>
            Choose an IGC file to view:
          </ControlLabel>
          <FormControl type="file" accept=".igc" />
          <HelpBlock>
            This file will be opened inside your browser; it won't
            be uploaded to the Internet.
          </HelpBlock>
        </FormGroup>
      </form>
    </Jumbotron>
  );
}

StartupBanner.propTypes = {
};

export default StartupBanner;
