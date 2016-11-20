import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import TaskPlannerPage from './containers/TaskPlannerPage'; // eslint-disable-line import/no-named-as-default
import FlightInformationContainer from './containers/FlightInformationContainer'; // eslint-disable-line import/no-named-as-default
import IgcMapPageContainer from './containers/IgcMapPageContainer'; // eslint-disable-line import/no-named-as-default
import BarogramPageContainer from './containers/BarogramPageContainer'; // eslint-disable-line import/no-named-as-default
import CombinedViewPageContainer from './containers/CombinedViewPageContainer'; // eslint-disable-line import/no-named-as-default
import SettingsPageContainer from './containers/SettingsPageContainer'; // eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CombinedViewPageContainer}/>
    <Route path="task" component={TaskPlannerPage}/>
    <Route path="flightinfo" component={FlightInformationContainer}/>
    <Route path="igcmap" component={IgcMapPageContainer}/>
    <Route path="barogram" component={BarogramPageContainer} />
    <Route path="combined" component={CombinedViewPageContainer} />
    <Route path="settings" component={SettingsPageContainer} />
    <Route path="*" component={CombinedViewPageContainer}/>
  </Route>
);
