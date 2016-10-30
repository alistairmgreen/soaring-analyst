import { push } from 'react-router-redux';
import parseIGC from '../parser/parseIGC';
import * as ACTION from './actionTypes';



export function deleteTurnpoint(index) {
  return {
    type: ACTION.DELETE_TURNPOINT,
    index: index
  };
}



export function fileLoading(fileName) {
  return {
    type: ACTION.FILE_LOADING,
    fileName: fileName
  };
}


export function loadFileSuccess(fileName, loggerTrace) {
  return {
    type: ACTION.LOAD_FILE_SUCCESS,
    fileName,
    loggerTrace
  };
}


export function loadFileFailure(errorMessage) {
  return {
    type: ACTION.LOAD_FILE_FAILURE,
    errorMessage: errorMessage
  };
}

export function loadFile(file) {
  return function(dispatch) {
    let fileName = file.name;
    dispatch(fileLoading(fileName));

    let reader = new FileReader();
    reader.onload = function() {
      try {
        let igc = parseIGC(reader.result);
        dispatch(loadFileSuccess(fileName, igc));
        dispatch(push("/igcview"));
      }
      catch(exception) {
        let message = exception.message || "An error has occurred.";
        dispatch(loadFileFailure(message));
      }
    };

    reader.onerror = function() {
      dispatch(loadFileFailure("The file could not be read."));
    };

    reader.readAsText(file);
  };
}

export function setTimeIndex(index) {
  return {
    type: ACTION.SET_TIME_INDEX,
    index
  };
}
