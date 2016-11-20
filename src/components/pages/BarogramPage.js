import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import Timeline from '../Timeline';
import Barogram from '../charts/Barogram';
import AltitudeSelector from '../AltitudeSelector';
import * as keys from '../../constants/StateKeys';

class BarogramPage extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.time === this.props.time &&
      nextProps.altitude === this.props.altitude);
  }

  render() {
    const { altitude, time, setTimeIndex, setAltitudeSource, setAltitudeUnit } = this.props;

    const timeIndex = time.get(keys.TIME_INDEX);
    const altitudeSource = altitude.get(keys.ALTITUDE_SOURCE);
    const timestamps = time.get(keys.TIMESTAMPS);
    const currentTime = timestamps.get(timeIndex);
    const altitudeUnit = altitude.get(keys.ALTITUDE_UNIT);
    const currentAltitude = altitude.getIn([keys.ALTITUDES, timeIndex]);

    return (
      <div>
        <Timeline timeIndex={timeIndex}
          max={time.get(keys.MAX_TIME_INDEX)}
          currentTime={currentTime}
          currentAltitude={currentAltitude}
          altitudeUnit={altitude.get(keys.ALTITUDE_UNIT_ABBREVIATION)}
          altitudeSource={altitudeSource}
          setTimeIndex={setTimeIndex} />

        <AltitudeSelector currentSource={altitudeSource}
          altitudeSources={altitude.get(keys.AVAILABLE_ALTITUDE_SOURCES)}
          onSourceChanged={setAltitudeSource}
          unit={altitudeUnit}
          availableUnits={altitude.get(keys.AVAILABLE_ALTITUDE_UNITS)}
          onUnitChanged={setAltitudeUnit} />

        <Barogram timestamps={timestamps}
          altitudes={altitude.get(keys.ALTITUDES)}
          altitudeUnit={altitudeUnit}
          altitudeSource={altitudeSource}
          currentTime={currentTime}
          timeZoneName={time.get(keys.TIME_ZONE_NAME)}
          currentAltitude={currentAltitude}
          onPlotClick={setTimeIndex} />
      </div>
    );
  }
}

BarogramPage.propTypes = {
  time: PropTypes.instanceOf(Map).isRequired,
  altitude: PropTypes.instanceOf(Map).isRequired,
  setTimeIndex: PropTypes.func.isRequired,
  setAltitudeSource: PropTypes.func.isRequired,
  setAltitudeUnit: PropTypes.func.isRequired
};

export default BarogramPage;
