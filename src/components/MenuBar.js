import React, { PropTypes } from 'react';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

function MenuBar(props) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          {props.fileLoaded ? props.fileName : "Soaring Analyst"}
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <IndexLinkContainer to="/">
            <NavItem>Home</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/task">
            <NavItem>{props.fileLoaded ? "Task Editor" : "Task Planner"}</NavItem>
          </LinkContainer>
          <LinkContainer to="/igcview">
            <NavItem>IGC Viewer </NavItem>
          </LinkContainer>
          <NavItem href="https://github.com/GlidingWeb">
            <Glyphicon bsClass="fa" glyph="github" /> GitHub
            </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

MenuBar.propTypes = {
  fileName: PropTypes.string,
  fileLoaded: PropTypes.bool.isRequired
};

export default MenuBar;
