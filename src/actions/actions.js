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

export function loadFileSuccess(fileName) {
  return {
    type: LOAD_FILE_SUCCESS,
    fileName: fileName
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

    setTimeout(
      () => dispatch(loadFileSuccess(file.name)),
      2000);
  };
}
