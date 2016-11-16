import React, { PropTypes } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { List } from 'immutable';

function AltitudeSelector(props) {
  return (
    <Form inline>
      <FormGroup controlId="altitudeSource">
        <ControlLabel> Altitude source: </ControlLabel>
        {' '}
        <FormControl componentClass="select" value={props.currentSource} onChange={e => props.onSourceChanged(e.target.value)}>
          {props.altitudeSources.map(s => <option key={s} value={s}>{s}</option>)}
        </FormControl>
      </FormGroup>
      &nbsp;&nbsp;
      <FormGroup controlId="altitudeUnit">
        <ControlLabel> Unit: </ControlLabel>
        {' '}
        <FormControl componentClass="select" value={props.unit} onChange={e => props.onUnitChanged(e.target.value)}>
          {props.availableUnits.map(u => <option key={u} value={u}>{u}</option>)}
        </FormControl>
      </FormGroup>
    </Form>
  );
}

AltitudeSelector.propTypes = {
  currentSource: PropTypes.string.isRequired,
  altitudeSources: PropTypes.instanceOf(List).isRequired,
  onSourceChanged: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
  availableUnits: PropTypes.instanceOf(List).isRequired,
  onUnitChanged: PropTypes.func.isRequired
};

export default AltitudeSelector;
