import * as STATUS from '../constants/loadingStatus';
import { FILE_LOADING, LOAD_FILE_SUCCESS, LOAD_FILE_FAILURE } from '../actions/actionTypes';

export default function loadingStatusReducer(state = STATUS.NO_FILE_LOADED, action = {}) {
  const type = action.type || "";

  switch(type) {
    case FILE_LOADING:
      return STATUS.LOAD_IN_PROGRESS;

    case LOAD_FILE_SUCCESS:
      return STATUS.FILE_LOADED;

    case LOAD_FILE_FAILURE:
      return STATUS.NO_FILE_LOADED;

    default:
      return state;
  }
}
