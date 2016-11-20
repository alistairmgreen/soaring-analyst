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
    const {
      timeIndex,
      max,
      currentTime,
      currentPosition,
      currentAltitude,
      altitudeUnit,
      altitudeSource
    } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <Form>
          <FormGroup>
            <FormControl type="range"
              min={0}
              max={max}
              step={1}
              value={timeIndex}
              onChange={this.handleSliderChange} />
          </FormGroup>
        </Form>

        <p>
          {currentTime.format('HH:mm:ssZ')}: {currentPosition.formatted}, {currentAltitude.toFixed(0)} {altitudeUnit} ({altitudeSource})
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
  currentPosition: PropTypes.object.isRequired,
  currentAltitude: PropTypes.number.isRequired,
  altitudeUnit: PropTypes.string.isRequired,
  altitudeSource: PropTypes.string.isRequired
};

export default Timeline;
