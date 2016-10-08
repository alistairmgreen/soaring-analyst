import * as actions from '../actions/actions';
import { emptyLoggerTrace } from './initialState';

let operations = [];

operations[actions.LOAD_FILE_SUCCESS] = function (state, action) {
  return state.merge({
    fileName: action.fileName,
    errorMessage: "",
    fileLoaded: true
  });
};

operations[actions.LOAD_FILE_FAILURE] = function (state, action) {
  return state.merge({
    errorMessage: action.errorMessage,
    fileLoaded: false
  });
};

export default function loggerTraceReducer(state = emptyLoggerTrace, action) {
  let actionType = action.type;

  if (actionType && operations.hasOwnProperty(actionType)) {
    return operations[actionType](state, action);
  }

  return state;
}
