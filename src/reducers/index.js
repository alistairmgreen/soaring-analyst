 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import taskReducer from './taskReducer';

 export default combineReducers({
   task: taskReducer,
   routing: routerReducer
 });
