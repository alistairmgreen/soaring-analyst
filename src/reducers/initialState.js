import { Map, fromJS } from 'immutable';

export const initialTask = fromJS({
  waypoints: [
    {
      name: 'Bicester Airfield',
      position: {
        lat: 51.9203333333333,
        lng: -1.13141666666667
      }
    },
    {
      name: 'Bidford',
      position: {
        lat: 51.9203333333333,
        lng: -1.84755000000000
      }
    },
    {
      name: 'Towcester',
      position: {
        lat: 52.1396333333333,
        lng: -0.996850000000000
      }
    },
    {
      name: 'Bicester Airfield',
      position: {
        lat: 51.9203333333333,
        lng: -1.13141666666667
      }
    }
  ],

  defaultMapLocation: {
    center: { lat: 51.9203333333333, lng: -1.13141666666667 },
    zoom: 8
  }
});

export const emptyLoggerTrace = Map({
  fileLoaded: false,
  fileLoadInProgress: false,
  fileName: "",
  errorMessage: ""
});
