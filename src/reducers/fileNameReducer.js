import { FILE_LOADING } from '../actions/actionTypes';

export default function fileNameReducer(state = "", action = {}) {
  if (action.type === FILE_LOADING) {
    return action.fileName;
  }

  return state;
}
