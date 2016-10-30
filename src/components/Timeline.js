import React, { PropTypes } from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import moment from 'moment';

class Timeline extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(event) {
    let index = parseInt(event.target.value, 10);
    this.props.setTimeIndex(index);
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Form>
          <FormGroup>
            <FormControl type="range"
              min={0}
              max={this.props.max}
              step={1}
              value={this.props.timeIndex}
              onChange={this.handleSliderChange} />
          </FormGroup>
        </Form>

        <p>
          {this.props.currentTime.format('HH:mm:ssZ')}: GPS Altitude {this.props.currentAltitude} m
        </p>
      </div>
    );
  }
}

Timeline.propTypes = {
  timeIndex: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  setTimeIndex: PropTypes.func.isRequired,
  currentTime: PropTypes.instanceOf(moment).isRequired,
  currentAltitude: PropTypes.number.isRequired
};

export default Timeline;
