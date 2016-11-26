import React from 'react';
import AltitudeChooser from '../AltitudeChooser';

class SettingsPage extends React.Component {
  render() {

    return (
      <div>
        <h1> Settings </h1>

        <h2> Altitude </h2>

        <AltitudeChooser />

      </div>
    );
  }
}

export default SettingsPage;
