import { fromJS } from 'immutable';
import { initialTask } from './initialState';
import * as actions from '../actions/actions';

let operations = {};

operations[actions.DELETE_TURNPOINT] = function(state, action) {
  return state.delete(action.index);
};

operations[actions.LOAD_FILE_SUCCESS] = function(state, action) {
  let task = action.loggerTrace.task;
  if(task.declared) {
    return fromJS(task.waypoints);
  }

  return state;
};

export default function taskReducer(state = initialTask, action) {
  let actionType = action.type || "";

  if (operations.hasOwnProperty(actionType)) {
    return operations[actionType](state, action);
  }

  return state;
}
