import React, { PropTypes } from 'react';
import { ButtonToolbar, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { List } from 'immutable';

function MapToolbar(props){
  let waypointItems = [];
  const waypointNames = props.waypointNames;
  if (waypointNames) {
    let lastIndex = waypointNames.count() - 1;
    waypointItems = waypointNames.map((name, index) => {
    let label;

    if (index === lastIndex){
      label = 'Finish:';
    }
    else if (index === 0) {
      label = 'Start:';
    }
    else {
      label = `Turnpoint ${index}:`;
    }
    return (
      <MenuItem key={index+2} onClick={()=>props.zoomToWaypoint(index)}>
      <strong>{label}</strong> {name}
      </MenuItem>);
  });
  }

  return (
    <ButtonToolbar>
      <ButtonGroup bsSize="large">
        <DropdownButton title="Zoom to...">
          <MenuItem onClick={props.zoomToFlightPath}><strong>Flight path</strong></MenuItem>
          <MenuItem divider />
          {waypointItems}
        </DropdownButton>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

MapToolbar.propTypes = {
  waypointNames: PropTypes.instanceOf(List),
  zoomToFlightPath: PropTypes.func.isRequired,
  zoomToWaypoint: PropTypes.func
};

export default MapToolbar;
