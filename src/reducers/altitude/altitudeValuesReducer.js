import { List, Map } from 'immutable';
import { LOAD_FILE_SUCCESS } from '../../actions/actionTypes';

const EMPTY_ALTITUDES = Map({
  GPS: List(),
  Pressure: List()
});

export default function altitudeValuesReducer(state = EMPTY_ALTITUDES, action = {}) {
  const actionType = action.type || "";

  if (actionType === LOAD_FILE_SUCCESS) {
    const fixes = action.loggerTrace.fixes;

    return Map({
      GPS: List(fixes.map(f => f.gpsAltitude)),
      Pressure: List(fixes.map(f => f.pressureAltitude))
    });
  }

  return state;
}
