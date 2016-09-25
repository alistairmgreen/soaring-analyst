import React from 'react';
import { Button, ButtonToolbar, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomePage = () => {
  return (
    <Jumbotron>
      <h1>Soaring Analyst</h1>

      <p>
        A free browser-based flight planning and analysis tool for glider pilots.
      </p>

      <p>
        &copy; 2016 Alistair Green
      </p>

      <ButtonToolbar>
        <LinkContainer to="/task">
          <Button bsStyle="primary">Plan a cross country task </Button>
        </LinkContainer>
        <LinkContainer to="/igcview">
          <Button bsStyle="success">View an IGC logger trace </Button>
        </LinkContainer>
      </ButtonToolbar>
    </Jumbotron>
  );
};

export default HomePage;
