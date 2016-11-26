import React from 'react';
import Timeline from '../timeline/Timeline';
import AltitudeChooser from '../AltitudeChooser';
import Barogram from '../charts/Barogram';

export default class BarogramPage extends React.Component {
  render() {
    return (
      <div>
        <Timeline />
        <AltitudeChooser />
        <Barogram />
      </div>
    );
  }
}
