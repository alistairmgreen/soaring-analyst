import { push } from 'react-router-redux';
import parseIGC from '../parser/parseIGC';

export const DELETE_TURNPOINT = "DELETE_TURNPOINT";

export function deleteTurnpoint(index) {
  return {
    type: DELETE_TURNPOINT,
    index: index
  };
}

export const FILE_LOADING = "FILE_LOADING";

export function fileLoading(fileName) {
  return {
    type: FILE_LOADING,
    fileName: fileName
  };
}

export const LOAD_FILE_SUCCESS = "LOAD_FILE_SUCCESS";

export function loadFileSuccess(fileName, loggerTrace) {
  return {
    type: LOAD_FILE_SUCCESS,
    fileName,
    loggerTrace
  };
}

export const LOAD_FILE_FAILURE = "LOAD_FILE_FAILURE";

export function loadFileFailure(errorMessage) {
  return {
    type: LOAD_FILE_FAILURE,
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
