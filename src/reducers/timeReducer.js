import { List } from 'immutable';
import { defaultTime } from './initialState';
import * as actionTypes from '../actions/actionTypes';
import * as keys from '../constants/StateKeys';

let operations = [];

operations[actionTypes.LOAD_FILE_SUCCESS] = (state, action) => {
  const timestamps = List(action.loggerTrace.fixes.map(f => f.timestamp));

  return state.merge({
    timeZoneName: 'Coordinated Universal Time',
    timestamps: timestamps,
    timeIndex: 0,
    currentTimestamp: timestamps.get(0),
    maxTimeIndex: timestamps.count() - 1
  });
};

operations[actionTypes.SET_TIMEZONE] = (state, action) => {
  const offset = action.offsetSeconds / 60.0;
  const adjustedTimestamps = state.get(keys.TIMESTAMPS)
    .map(t => t.clone().utcOffset(offset));

  return state.merge({
    timestamps: adjustedTimestamps,
    timeZoneName: action.timeZoneName,
    currentTimestamp: state.get('currentTimestamp').clone().utcOffset(offset)
  });
};

operations[actionTypes.SET_TIME_INDEX] = (state, action) => {
  return state.merge({
    currentTimestamp: state.getIn([keys.TIMESTAMPS, action.index]),
    timeIndex: action.index
  });
};

export default function timeReducer(state = defaultTime, action = {}) {
  let actionType = action.type;

  if (actionType && operations.hasOwnProperty(actionType)) {
    return operations[actionType](state, action);
  }

  return state;
}
