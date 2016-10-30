import { fromJS } from 'immutable';
import { initialTask } from './initialState';
import * as actions from '../actions/actions';
import * as TASK_STATE from '../constants/TaskStateKeys';
import calculateBounds from '../geometry/calculateBounds';

let operations = {};

operations[actions.DELETE_TURNPOINT] = function (state, action) {
  return state.set(TASK_STATE.WAYPOINTS,
    state.get(TASK_STATE.WAYPOINTS).delete(action.index));
};

operations[actions.LOAD_FILE_SUCCESS] = function (state, action) {
  let task = action.loggerTrace.task;
  if (task.declared) {
    return fromJS({
      waypoints: task.waypoints,
      defaultMapLocation: {
        bounds: calculateBounds(task.waypoints.map(w => w.position))
      }
    });
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
