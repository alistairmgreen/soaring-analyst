import React, { PropTypes } from 'react';
import { ButtonToolbar, ButtonGroup, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap';
import { List } from 'immutable';

function MapToolbar(props) {
  let waypointItems = [];
  const waypointNames = props.waypointNames;
  if (waypointNames) {
    let lastIndex = waypointNames.count() - 1;
    waypointItems = waypointNames.map((name, index) => {
      let label;

      if (index === lastIndex) {
        label = 'Finish:';
      }
      else if (index === 0) {
        label = 'Start:';
      }
      else {
        label = `Turnpoint ${index}:`;
      }
      return (
        <MenuItem key={index + 2} onClick={() => props.zoomToWaypoint(index)}>
          <strong>{label}</strong> {name}
        </MenuItem>);
    });
  }

  return (
    <ButtonToolbar>
      <ButtonGroup bsSize="large">
        <Dropdown>
          <Dropdown.Toggle>
            <Glyphicon bsClass="fa" glyph="search" /> &nbsp; Zoom to...
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem onClick={props.zoomToFit}><strong>{props.zoomToFitLabel}</strong></MenuItem>
            <MenuItem divider />
            {waypointItems}
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

MapToolbar.propTypes = {
  waypointNames: PropTypes.instanceOf(List),
  zoomToFit: PropTypes.func.isRequired,
  zoomToFitLabel: PropTypes.string.isRequired,
  zoomToWaypoint: PropTypes.func
};

export default MapToolbar;
