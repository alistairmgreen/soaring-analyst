import { initialTask } from './initialState';
import * as actions from '../actions/actions';

let operations = {};

operations[actions.DELETE_TURNPOINT] = function(state, action) {
  return state.delete(action.index);
};

export default function taskReducer(state = initialTask, action) {
  let actionType = action.type || "";

  if (operations.hasOwnProperty(actionType)) {
    return operations[actionType](state, action);
  }

  return state;
}
