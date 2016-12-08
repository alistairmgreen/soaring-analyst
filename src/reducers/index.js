 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import loadingStatusReducer from './loadingStatusReducer';
 import taskReducer from './taskReducer';
 import headersReducer from './headersReducer';
 import loggerTraceReducer from './loggerTraceReducer';
 import timeIndexReducer from './timeIndexReducer';
 import timestampsReducer from './timestampsReducer';
 import timeZoneReducer from './timeZoneReducer';
 import altitudeReducer from './altitudeReducer';
 import errorMessageReducer from './errorMessageReducer';
 import fileNameReducer from './fileNameReducer';

 export default combineReducers({
   errorMessage: errorMessageReducer,
   fileName: fileNameReducer,
   loadingStatus: loadingStatusReducer,
   task: taskReducer,
   headers: headersReducer,
   loggerTrace: loggerTraceReducer,
   timeIndex: timeIndexReducer,
   timestamps: timestampsReducer,
   timeZone: timeZoneReducer,
   altitude: altitudeReducer,
   routing: routerReducer
 });
