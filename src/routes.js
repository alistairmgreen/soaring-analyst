import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import TaskPlannerPage from './containers/TaskPlannerPage'; // eslint-disable-line import/no-named-as-default
import IgcViewer from './components/IgcViewer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="task" component={TaskPlannerPage}/>
    <Route path="igcview" component={IgcViewer}/>
    <Route path="*" component={HomePage}/>
  </Route>
);
