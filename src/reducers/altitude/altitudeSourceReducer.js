import * as SOURCE from '../../constants/altitudeSources';
import { SET_ALTITUDE_SOURCE } from '../../actions/actionTypes';

export default function altitudeSourceReducer(state = SOURCE.GPS, action = {}) {
  if (action.type === SET_ALTITUDE_SOURCE) {
    return action.source;
  }

  return state;
}
