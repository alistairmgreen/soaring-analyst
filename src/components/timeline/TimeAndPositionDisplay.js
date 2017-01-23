import React, { PropTypes } from 'react';
import moment from 'moment';

function TimeAndPositionDisplay(props) {
  const time = props.time.format('HH:mm:ssZ');
  const altitude = props.altitude.toFixed(0);
  const {position, altitudeUnit, altitudeSource } = props;

  return (
    <p>
      {time}: {position}, {altitude} {altitudeUnit} ({altitudeSource})
    </p>
  );
}

TimeAndPositionDisplay.propTypes = {
  time: PropTypes.instanceOf(moment).isRequired,
  position: PropTypes.string.isRequired,
  altitude: PropTypes.number.isRequired,
  altitudeSource: PropTypes.string.isRequired,
  altitudeUnit: PropTypes.string.isRequired
};

export default TimeAndPositionDisplay;
