 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import taskReducer from './taskReducer';
 import loggerTraceReducer from './loggerTraceReducer';

 export default combineReducers({
   task: taskReducer,
   loggerTrace: loggerTraceReducer,
   routing: routerReducer
 });
