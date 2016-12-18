import { FEET } from '../../constants/units';
import { SET_ALTITUDE_UNIT } from '../../actions/actionTypes';

export default function altitudeUnitReducer(state = FEET, action = {}) {
  const actionType = action.type || "";

  if (actionType === SET_ALTITUDE_UNIT) {
    return action.unit;
  }

  return state;
}
