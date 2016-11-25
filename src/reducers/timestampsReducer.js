import { List } from 'immutable';
import moment from 'moment';
import * as actionTypes from '../actions/actionTypes';

export default function timeReducer(state = List.of(moment()), action = {}) {
  const type = action.type || "";

  switch (type) {
    case actionTypes.LOAD_FILE_SUCCESS:
      return List(action.loggerTrace.fixes.map(f => f.timestamp));

    case actionTypes.SET_TIMEZONE:
      return state.map(t => t.clone().utcOffset(action.offsetSeconds / 60));
  }

  return state;
}
