import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import TaskPlannerPage from './containers/TaskPlannerPage'; // eslint-disable-line import/no-named-as-default
import IgcViewerPage from './containers/IgcViewerPage'; // eslint-disable-line import/no-named-as-default
import IgcMapPage from './containers/IgcMapPage'; // eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="task" component={TaskPlannerPage}/>
    <Route path="igcview" component={IgcViewerPage}/>
    <Route path="igcmap" component={IgcMapPage}/>
    <Route path="*" component={HomePage}/>
  </Route>
);
