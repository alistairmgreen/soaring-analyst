import { combineReducers } from 'redux';
import { List, Map } from 'immutable';
import { FEET, METRES } from '../../constants/units';
import { GPS, PRESSURE } from '../../constants/altitudeSources';
import altitudeSourceReducer from './altitudeSourceReducer';
import altitudeUnitReducer from './altitudeUnitReducer';
import altitudeValuesReducer from './altitudeValuesReducer';

const abbreviations = Map({
  Feet: 'ft',
  Metres: 'm'
});

export default combineReducers({
  availableUnits: (state => state || List.of(FEET, METRES)),
  availableSources: (state => state || List.of(GPS, PRESSURE)),
  source: altitudeSourceReducer,
  unit: altitudeUnitReducer,
  unitAbbreviations: (state => state || abbreviations),
  values: altitudeValuesReducer
});
