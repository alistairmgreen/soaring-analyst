import { Map, List } from 'immutable';
import * as ACTIONTYPE from '../actions/actionTypes';

const FEET = 'Feet',
  METRES = 'Metres',
  GPS = 'GPS',
  PRESSURE = 'Pressure';

const ABBREVIATION = {
  'Feet': 'ft',
  'Metres': 'm'
};

const defaultAltitude = Map({
  availableUnits: List.of(FEET, METRES),
  unit: FEET,
  unitAbbreviation: ABBREVIATION[FEET],
  availableSources: List.of(GPS, PRESSURE),
  source: GPS,
  altitudes: List(),
  gpsMetres: List(),
  gpsFeet: List(),
  pressureMetres: List(),
  pressureFeet: List()
});

const operations = [];

function getAppropriateAltitudes(state, settings) {
  const isPressure = settings.source === PRESSURE;

  let propertyName;
  if (isPressure) {
    propertyName = `pressure${settings.unit}`;
  }
  else {
    propertyName = `gps${settings.unit}`;
  }

  return state.get(propertyName);
}

operations[ACTIONTYPE.LOAD_FILE_SUCCESS] = (state, action) => {
  const M_TO_FT = 3.28084;
  const trace = action.loggerTrace;
  const gpsMetres = List(trace.fixes.map(fix => fix.gpsAltitude));
  const gpsFeet = gpsMetres.map(m => m * M_TO_FT);
  const pressureMetres = List(trace.fixes.map(fix => fix.pressureAltitude));
  const pressureFeet = pressureMetres.map(m => m * M_TO_FT);
  const isFeet = state.get('unit') === FEET;
  const isPressure = state.get('source') === PRESSURE;

  let altitudes;

  if (isPressure) {
    altitudes = isFeet ? pressureFeet : pressureMetres;
  }
  else {
    altitudes = isFeet ? gpsFeet : gpsMetres;
  }

  return state.merge({
    gpsMetres,
    gpsFeet,
    pressureMetres,
    pressureFeet,
    altitudes
  });
};

operations[ACTIONTYPE.SET_ALTITUDE_UNIT] = (state, action) => {
  const { unit } = action;

  const altitudes = getAppropriateAltitudes(state, {
    unit,
    source: state.get('source')
  });

  return state.merge({
    unit,
    unitAbbreviation: ABBREVIATION[unit] || '',
    altitudes
  });
};

operations[ACTIONTYPE.SET_ALTITUDE_SOURCE] = (state, action) => {
  const { source } = action;

  const altitudes = getAppropriateAltitudes(state, {
    source,
    unit: state.get('unit')
  });

  return state.merge({
    source,
    altitudes
  });
};

export default function altitudeReducer(state = defaultAltitude, action = {}) {
  let { type } = action;

  if (type && operations.hasOwnProperty(type)) {
    return operations[type](state, action);
  }

  return state;
}
