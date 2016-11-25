 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import taskReducer from './taskReducer';
 import loggerTraceReducer from './loggerTraceReducer';
 import timeReducer from './timeReducer';
 import timeIndexReducer from './timeIndexReducer';
 import timestampsReducer from './timestampsReducer';
 import timeZoneReducer from './timeZoneReducer';
 import altitudeReducer from './altitudeReducer';

 export default combineReducers({
   task: taskReducer,
   loggerTrace: loggerTraceReducer,
   time: timeReducer,
   timeIndex: timeIndexReducer,
   timestamps: timestampsReducer,
   timeZone: timeZoneReducer,
   altitude: altitudeReducer,
   routing: routerReducer
 });
