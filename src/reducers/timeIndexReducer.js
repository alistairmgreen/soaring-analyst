import { SET_TIME_INDEX, LOAD_FILE_SUCCESS } from '../actions/actionTypes';

export default function timeIndexReducer(state = 0, action = {}) {
  let type = action.type || "";

  switch(type) {
    case SET_TIME_INDEX:
      return action.index;

    case LOAD_FILE_SUCCESS:
      return 0;
  }

  return state;
}
