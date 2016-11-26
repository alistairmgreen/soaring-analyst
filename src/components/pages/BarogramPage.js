import React from 'react';
import Timeline from '../timeline/Timeline';
import AltitudeSelector from '../AltitudeSelector';
import Barogram from '../charts/Barogram';

export default class BarogramPage extends React.Component {
  render() {
    return (
      <div>
        <Timeline />
        <AltitudeSelector />
        <Barogram />
      </div>
    );
  }
}
