import React, { PropTypes } from 'react';
import { Glyphicon, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, ControlLabel } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import IGCFilePicker from './IGCFilePicker';

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
        <Navbar.Form pullLeft>
          <FormGroup controlId="igcMenuFileSelector">
            <ControlLabel>
              Open an IGC logger file
                </ControlLabel>
            <IGCFilePicker onChooseFile={props.loadFileAction} />
          </FormGroup>
        </Navbar.Form>
        <Nav>
          <LinkContainer to="/task">
            <NavItem>
              <Glyphicon bsClass="fa" glyph="map-signs" />
              &nbsp;
              {props.fileLoaded ? "Edit Task" : "Plan a Task"}
            </NavItem>
          </LinkContainer>

          {props.fileLoaded && (
            <LinkContainer to="/flightinfo">
              <NavItem>
                <Glyphicon bsClass="fa" glyph="info-circle" />
                &nbsp; Flight Information
              </NavItem>
            </LinkContainer>
          )}
          {props.fileLoaded && (
            <LinkContainer to="/igcmap">
              <NavItem>
                <Glyphicon bsClass="fa" glyph="map" />
                &nbsp; Map View
            </NavItem>
            </LinkContainer>
          )}
          {props.fileLoaded && (
            <LinkContainer to="/barogram">
              <NavItem>
                <Glyphicon bsClass="fa" glyph="area-chart" />
                &nbsp; Barogram View
            </NavItem>
            </LinkContainer>
          )}
          {props.fileLoaded && (
            <NavItem>
              <Glyphicon bsClass="fa" glyph="map" />
              &nbsp;
            <Glyphicon bsClass="fa" glyph="area-chart" />
              &nbsp;
              Combined View
             </NavItem>
          )}

          <NavItem>
            <Glyphicon bsClass="fa" glyph="gear" />
            &nbsp;
            Settings
          </NavItem>

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
  fileLoaded: PropTypes.bool.isRequired,
  loadFileAction: PropTypes.func.isRequired
};

export default MenuBar;
