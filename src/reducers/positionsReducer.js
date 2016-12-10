import { List } from 'immutable';
import { LOAD_FILE_SUCCESS } from '../actions/actionTypes';

export default function positionsReducer(state = List(), action = {}) {
  if (action.type === LOAD_FILE_SUCCESS) {
    return List(action.loggerTrace.fixes.map(f => f.position));
  }

  return state;
}
