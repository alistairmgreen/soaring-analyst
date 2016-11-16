 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import taskReducer from './taskReducer';
 import loggerTraceReducer from './loggerTraceReducer';
 import timeReducer from './timeReducer';
 import altitudeReducer from './altitudeReducer';

 export default combineReducers({
   task: taskReducer,
   loggerTrace: loggerTraceReducer,
   time: timeReducer,
   altitude: altitudeReducer,
   routing: routerReducer,
 });
