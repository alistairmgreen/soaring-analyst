 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import loadingStatusReducer from './loadingStatusReducer';
 import taskReducer from './taskReducer';
 import loggerTraceReducer from './loggerTraceReducer';
 import timeIndexReducer from './timeIndexReducer';
 import timestampsReducer from './timestampsReducer';
 import timeZoneReducer from './timeZoneReducer';
 import altitudeReducer from './altitudeReducer';
 import errorMessageReducer from './errorMessageReducer';

 export default combineReducers({
   errorMessage: errorMessageReducer,
   loadingStatus: loadingStatusReducer,
   task: taskReducer,
   loggerTrace: loggerTraceReducer,
   timeIndex: timeIndexReducer,
   timestamps: timestampsReducer,
   timeZone: timeZoneReducer,
   altitude: altitudeReducer,
   routing: routerReducer
 });
