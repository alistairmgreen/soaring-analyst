/* global google */
import React, {PropTypes} from 'react';
import { GoogleMap, GoogleMapLoader, Marker, Polyline } from 'react-google-maps';

class TaskEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const task = this.props.task;
    const taskCoordinates = task.map(t => ({ lat: t.latitude, lng: t.longitude }));
    return (
      <section style={{ height: `100%` }}>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: `400px`,
              }}
              />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={8}
              defaultCenter={{ lat: 51.9203333333333, lng: -1.13141666666667 }}
              options={{
                streetViewControl: false,
                mapTypeControl: true,
                mapTypeControlOptions: {
                  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                  mapTypeIds: ['roadmap', 'terrain', 'satellite']
                }
              }}>
              {task.map((t, index) =>
                <Marker key={index} position={{ lat: t.latitude, lng: t.longitude }} />)
              }

              <Polyline
                options={{ strokeColor: "black", strokeWeight: 1 }}
                path={taskCoordinates}
                />
            </GoogleMap>
          }
          />
      </section>
    );
  }
}

TaskEditor.propTypes = {
  task: PropTypes.array.isRequired
};

export default TaskEditor;