import React, { PropTypes } from 'react';
import { Glyphicon, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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
          <LinkContainer to="/task">
            <NavItem>
              <Glyphicon bsClass="fa" glyph="compass" />
              &nbsp;
              {props.fileLoaded ? "Edit Task" : "Plan a Task"}
            </NavItem>
          </LinkContainer>
          <NavDropdown title="View a logger trace" id="dropdownLoggerTrace">
            <LinkContainer to="/igcview">
              <NavItem>
                <Glyphicon bsClass="fa" glyph="info-circle" />
                &nbsp; Flight Information
              </NavItem>
            </LinkContainer>
            <NavItem>
              <Glyphicon bsClass="fa" glyph="map" />
              &nbsp;
            Map View
            </NavItem>
            <NavItem>
              <Glyphicon bsClass="fa" glyph="area-chart" />
              &nbsp;
            Barogram View
            </NavItem>
            <NavItem>
              <Glyphicon bsClass="fa" glyph="map" />
              &nbsp;
            <Glyphicon bsClass="fa" glyph="area-chart" />
              &nbsp;
              Combined View
             </NavItem>
          </NavDropdown>

          <NavDropdown title="About" id="dropdownAbout">
            <IndexLinkContainer to="/">
              <MenuItem>
                About Soaring Analyst
              </MenuItem>
            </IndexLinkContainer>
            <MenuItem divider />
            <MenuItem href="https://github.com/GlidingWeb">
              <Glyphicon bsClass="fa" glyph="github" />
              &nbsp; Source code on GitHub
          </MenuItem>

          </NavDropdown>
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
