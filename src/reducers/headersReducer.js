import { List } from 'immutable';
import { LOAD_FILE_SUCCESS } from '../actions/actionTypes';

export default function headersReducer(state = List(), action = {}) {
  if (action.type === LOAD_FILE_SUCCESS) {
    return List(action.loggerTrace.headers);
  }

  return state;
}
