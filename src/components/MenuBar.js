import React, { PropTypes } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import { LinkContainer } from 'react-router-bootstrap';
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
            <LinkContainer to="/combined">
              <NavItem>
                <Glyphicon bsClass="fa" glyph="map" />
                &nbsp;
            <Glyphicon bsClass="fa" glyph="area-chart" />
                &nbsp;
              Combined View
             </NavItem>
            </LinkContainer>
          )}

          <LinkContainer to="/settings">
            <NavItem>
              <Glyphicon bsClass="fa" glyph="gear" />
              &nbsp;
            Settings
          </NavItem>
          </LinkContainer>

          <NavDropdown title="About" id="dropdownAbout">
            <MenuItem href="https://github.com/alistairmgreen/soaring-analyst/blob/master/README.md">
              About Soaring Analyst
              </MenuItem>
            <MenuItem divider />
            <MenuItem href="https://github.com/alistairmgreen/soaring-analyst">
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
