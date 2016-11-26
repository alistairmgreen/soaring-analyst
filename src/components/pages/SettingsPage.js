import React from 'react';
import AltitudeSelector from '../AltitudeSelector';

class SettingsPage extends React.Component {
  render() {

    return (
      <div>
        <h1> Settings </h1>

        <h2> Altitude </h2>

        <AltitudeSelector />

      </div>
    );
  }
}

export default SettingsPage;
