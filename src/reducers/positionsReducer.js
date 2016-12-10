import { List, fromJS } from 'immutable';
import { LOAD_FILE_SUCCESS } from '../actions/actionTypes';

export default function positionsReducer(state = List(), action = {}) {
  if (action.type === LOAD_FILE_SUCCESS) {
    return fromJS(action.loggerTrace.fixes.map(f => f.position));
  }

  return state;
}
