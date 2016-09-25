import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import TaskPlanner from './components/TaskPlanner';
import IgcViewer from './components/IgcViewer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="task" component={TaskPlanner}/>
    <Route path="igcview" component={IgcViewer}/>
    <Route path="*" component={HomePage}/>
  </Route>
);
