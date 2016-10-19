import { List, fromJS } from 'immutable';
import * as actions from '../actions/actions';
import { emptyLoggerTrace } from './initialState';
import * as keys from '../constants/StateKeys';

let operations = [];

operations[actions.FILE_LOADING] = function (state, action) {
  return state.merge({
    fileName: action.fileName,
    fileLoadInProgress: true
  });
};

operations[actions.LOAD_FILE_SUCCESS] = function (state, action) {
  let trace = action.loggerTrace;

  return state.merge({
    fileName: action.fileName,
    errorMessage: "",
    fileLoaded: true,
    fileLoadInProgress: false,
    headers: fromJS(trace.headers),
    timestamps: List(trace.fixes.map(f => f.timestamp)),
    positions: List(trace.fixes.map(f => f.position)),
    pressureAltitudes: List(trace.fixes.map(f => f.pressureAltitude)),
    gpsAltitudes: List(trace.fixes.map(f => f.gpsAltitude)),
    timeIndex: 0,
    maxTimeIndex: trace.fixes.length - 1,
    currentPosition: trace.fixes[0].position,
    currentAltitude: trace.fixes[0].gpsAltitude,
    currentTimestamp: trace.fixes[0].timestamp
  });
};

operations[actions.LOAD_FILE_FAILURE] = function (state, action) {
  return state.merge({
    errorMessage: action.errorMessage,
    fileLoaded: false,
    fileLoadInProgress: false
  });
};

operations[actions.SET_TIME_INDEX] = function (state, action) {
  let index = action.index;
  return state.merge({
    timeIndex: index,
    currentPosition: state.getIn([keys.POSITIONS, index]),
    currentAltitude: state.getIn([keys.GPS_ALTITUDES, index]),
    currentTimestamp: state.getIn([keys.TIMESTAMPS, index])
  });
};

export default function loggerTraceReducer(state = emptyLoggerTrace, action) {
  let actionType = action.type;

  if (actionType && operations.hasOwnProperty(actionType)) {
    return operations[actionType](state, action);
  }

  return state;
}
