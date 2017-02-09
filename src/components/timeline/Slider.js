import React, { PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';


function Slider(props) {
  // The Change event never fires in Internet Explorer.
  // This is a known issue in React itself which has been closed
  // on Github but not actually fixed.
  // As a workaround, use the same handler for click, key press and
  // mouse move (with any button pressed).
  const handleChange = event => props.onChange(parseInt(event.target.value, 10));
  return (
    <Form>
      <FormGroup>
        <FormControl type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          value={props.value}
          onChange={handleChange}
          onKeyPress={handleChange}
          onClick={handleChange}
          onMouseMove={e => e.buttons > 0 && handleChange(e)} />
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
