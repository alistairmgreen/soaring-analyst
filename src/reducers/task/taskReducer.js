import { List, fromJS } from 'immutable';
import {
  LOAD_FILE_SUCCESS,
  DELETE_TURNPOINT
} from '../../actions/actionTypes';

export default function taskReducer(state = List(), action = {}) {
  switch (action.type) {
    case LOAD_FILE_SUCCESS:
      return action.loggerTrace.task.declared ?
        fromJS(action.loggerTrace.task.waypoints)
        : state;

    case DELETE_TURNPOINT:
      return state.delete(action.index);

    default:
      return state;
  }
}
