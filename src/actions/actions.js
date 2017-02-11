import parseIGC from '../parser/parseIGC';
import * as ACTION from './actionTypes';
const API_KEYS = require('../apikeys');

export function deleteTurnpoint(index) {
  return {
    type: ACTION.DELETE_TURNPOINT,
    index: index
  };
}

export function setTimezone(offsetSeconds, timeZoneName) {
  return {
    type: ACTION.SET_TIMEZONE,
    offsetSeconds: offsetSeconds,
    timeZoneName: timeZoneName
  };
}

export function detectTimezone(options) {
  return function (dispatch) {
    const { position, timestamp } = options;
    const googleTimezoneUrl =
      `https://maps.googleapis.com/maps/api/timezone/json?location=${position.lat},${position.lng}&timestamp=${timestamp}&key=${API_KEYS.GoogleMaps}`;

    fetch(googleTimezoneUrl)
      .then(response => response.json())
      .then(response => {
        if (response.status === 'OK') {
          let offset = response.rawOffset + response.dstOffset;
          dispatch(setTimezone(offset, response.timeZoneName));
        }
      })
      .catch(); // Silently ignore errors; we will just display UTC.
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
  return function (dispatch) {
    let fileName = file.name;
    dispatch(fileLoading(fileName));

    let reader = new FileReader();
    reader.onload = function () {
      try {
        let igc = parseIGC(reader.result);
        dispatch(loadFileSuccess(fileName, igc));
        let firstFix = igc.fixes[0];
        dispatch(detectTimezone({
          position: firstFix.position,
          timestamp: firstFix.timestamp.unix()
        }));
      }
      catch (exception) {
        let message = exception.message || "An error has occurred.";
        dispatch(loadFileFailure(message));
      }
    };

    reader.onerror = function () {
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

export function setAltitudeUnit(unit) {
  return {
    type: ACTION.SET_ALTITUDE_UNIT,
    unit
  };
}

export function setAltitudeSource(source) {
  return {
    type: ACTION.SET_ALTITUDE_SOURCE,
    source
  };
}

export function googleMapsApiReady(api) {
  return {
    type: ACTION.GOOGLE_MAPS_API_READY,
    googlemaps: api
  };
}
