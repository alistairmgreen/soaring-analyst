import React, { PropTypes } from 'react';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

const App = (props) => {
  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Soaring Analyst
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem>Home</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/task">
              <NavItem>Task Planner</NavItem>
            </LinkContainer>
            <LinkContainer to="/igcview">
              <NavItem>IGC Viewer </NavItem>
            </LinkContainer>
            <NavItem href="https://github.com/GlidingWeb">
              <Glyphicon bsClass="fa" glyph="github"/> GitHub
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
