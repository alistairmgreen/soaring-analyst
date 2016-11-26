import React, { PropTypes } from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';

function Slider(props) {
  return (
    <Form>
      <FormGroup>
        <FormControl type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          value={props.value}
          onChange={e => props.onChange(parseInt(e.target.value, 10))} />
      </FormGroup>
    </Form>
  );
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

Slider.defaultProps = {
  min: 0,
  step: 1,
  onChange: () => {}
};

export default Slider;
