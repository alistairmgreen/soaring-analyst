import { List, Map } from 'immutable';

export const initialTask = List([
  Map({
    name: 'Bicester Airfield',
    lat: 51.9203333333333,
    lng: -1.13141666666667
  }),

  Map({
    name: 'Bidford',
    lat: 51.9203333333333,
    lng: -1.84755000000000
  }),

  Map({
    name: 'Towcester',
    lat: 52.1396333333333,
    lng: -0.996850000000000
  }),

  Map({
    name: 'Bicester Airfield',
    lat: 51.9203333333333,
    lng: -1.13141666666667
  })
]);

export const emptyLoggerTrace = Map({
  fileLoaded: false,
  fileName: "",
  errorMessage: ""
});
