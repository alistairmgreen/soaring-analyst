import * as actionTypes from '../actions/actionTypes';
import { UTC } from '../constants/timezones';


export default function timeZoneReducer(state = UTC, action = {}) {
  const type = action.type || "";

  switch(type) {
    case actionTypes.SET_TIMEZONE:
      return action.timeZoneName;

    case actionTypes.LOAD_FILE_SUCCESS:
      return UTC;
  }

  return state;
}
