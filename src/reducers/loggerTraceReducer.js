import { List, Map, fromJS } from 'immutable';
import * as actions from '../actions/actionTypes';
import { emptyLoggerTrace } from './initialState';
import * as keys from '../constants/StateKeys';
import calculateBounds from '../geometry/calculateBounds';

let operations = [];

operations[actions.FILE_LOADING] = function (state, action) {
  return state.set(keys.FILE_NAME, action.fileName);
};

operations[actions.LOAD_FILE_SUCCESS] = function (state, action) {
  let trace = action.loggerTrace;
  const positions = trace.fixes.map(f => f.position);

  return state.merge({
    fileName: action.fileName,
    errorMessage: "",
    headers: fromJS(trace.headers),
    positions: List(positions),
    currentPosition: trace.fixes[0].position,
    defaultMapLocation: Map({
      bounds: calculateBounds(positions)
    })
  });
};

operations[actions.LOAD_FILE_FAILURE] = function (state, action) {
  return state.set(keys.ERROR_MESSAGE, action.errorMessage);
};

operations[actions.SET_TIME_INDEX] = function (state, action) {
  let index = action.index;
  return state.merge({
    currentPosition: state.getIn([keys.POSITIONS, index]),
  });
};

export default function loggerTraceReducer(state = emptyLoggerTrace, action) {
  let actionType = action.type;

  if (actionType && operations.hasOwnProperty(actionType)) {
    return operations[actionType](state, action);
  }

  return state;
}
