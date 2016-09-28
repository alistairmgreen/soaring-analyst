import { initialTask } from './initialState';
import * as actions from '../actions/actions';

let operations = {};

operations[actions.DELETE_TURNPOINT] = function(state, action) {
  return state.delete(action.index);
};

export default function taskReducer(state = initialTask, action) {
  let noOp = state => state;
  let actionType = action.type || "";

  return (operations[actionType] || noOp)(state, action);
}
