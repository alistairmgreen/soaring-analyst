import { LOAD_FILE_SUCCESS, LOAD_FILE_FAILURE } from '../actions/actionTypes';

export default function errorMessageReducer(state = "", action = {}) {
  const actionType = action.type || "";

  switch (actionType) {
    case LOAD_FILE_FAILURE:
      return action.errorMessage;

    case LOAD_FILE_SUCCESS:
      return "";

    default:
      return state;
  }
}
