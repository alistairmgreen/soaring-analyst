import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import AltitudeSelector from '../AltitudeSelector';
import * as keys from '../../constants/StateKeys';

class SettingsPage extends React.Component {
  render() {
    const { altitude, setAltitudeSource, setAltitudeUnit } = this.props;

    return (
      <div>
        <h1> Settings </h1>

        <h2> Altitude </h2>

        <AltitudeSelector currentSource={altitude.get(keys.ALTITUDE_SOURCE)}
          altitudeSources={altitude.get(keys.AVAILABLE_ALTITUDE_SOURCES)}
          onSourceChanged={setAltitudeSource}
          unit={altitude.get(keys.ALTITUDE_UNIT)}
          availableUnits={altitude.get(keys.AVAILABLE_ALTITUDE_UNITS)}
          onUnitChanged={setAltitudeUnit}/>

      </div>
    );
  }
}

SettingsPage.propTypes = {
  altitude: PropTypes.instanceOf(Map).isRequired,
  setAltitudeSource: PropTypes.func.isRequired,
  setAltitudeUnit: PropTypes.func.isRequired
};

export default SettingsPage;
