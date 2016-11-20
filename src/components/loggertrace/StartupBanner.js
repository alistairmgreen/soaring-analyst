import React, { PropTypes } from 'react';
import { Alert, Button, Jumbotron, FormGroup, ControlLabel, HelpBlock, Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import IGCFilePicker from '../IGCFilePicker';

function StartupBanner(props) {
  return (
    <Jumbotron>
      <div style={{ textAlign: "center" }}>
        <h1>Soaring Analyst</h1>

        <p>
          A free browser-based flight planning and analysis tool for glider pilots.
      </p>

        <p>
          &copy; 2016 Alistair Green
      </p>
      </div>

      <Grid>
        <Row>
          <Col sm={12} md={6}>
            <h2> Logger trace viewer </h2>
            <form>
              <FormGroup controlId="igcFileSelector" bsSize="lg">
                <ControlLabel>
                  Choose an IGC logger trace file to view:
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
            )}
          </Col>
          <Col sm={12} md={6}>
            <h2> Task planner </h2>

            <LinkContainer to="/task">
              <Button bsStyle="primary">Plan a cross country task </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Grid>
    </Jumbotron>
  );
}

StartupBanner.propTypes = {
  loadFile: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default StartupBanner;
