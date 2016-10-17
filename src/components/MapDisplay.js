/* global google */
import React, {PropTypes} from 'react';
import { GoogleMap, GoogleMapLoader, Marker, Polyline } from 'react-google-maps';

export default function MapDisplay(props) {
  let task = props.task.map(turnpoint => ({
    lat: turnpoint.getIn(["position", "lat"]),
    lng: turnpoint.getIn(["position", "lng"])
  })).toArray();

  return (
      <section style={{ height: `100%` }}>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: "80vh",
              }}
              />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={8}
              defaultCenter={props.defaultCenter}
              options={{
                streetViewControl: false,
                mapTypeControl: true,
                mapTypeControlOptions: {
                  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                  mapTypeIds: ['roadmap', 'terrain', 'satellite']
                }
              }}>
              {task.map((t, index) =>
                <Marker key={index} position={t} />)
              }

              <Polyline
                options={{ strokeColor: "black", strokeWeight: 1 }}
                path={task}
                />

              {props.flightPath &&
              <Polyline options={{strokeColor: "blue", strokeWeight: 1}} path={props.flightPath} />}

            </GoogleMap>
          }
          />
      </section>
    );
}

MapDisplay.propTypes = {
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }).isRequired,
  task: PropTypes.object.isRequired,
  flightPath: PropTypes.array
};
