 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import loadingStatusReducer from './loadingStatusReducer';
 import taskReducer from './taskReducer';
 import loggerTraceReducer from './loggerTraceReducer';
 import timeIndexReducer from './timeIndexReducer';
 import timestampsReducer from './timestampsReducer';
 import timeZoneReducer from './timeZoneReducer';
 import altitudeReducer from './altitudeReducer';

 export default combineReducers({
   loadingStatus: loadingStatusReducer,
   task: taskReducer,
   loggerTrace: loggerTraceReducer,
   timeIndex: timeIndexReducer,
   timestamps: timestampsReducer,
   timeZone: timeZoneReducer,
   altitude: altitudeReducer,
   routing: routerReducer
 });
