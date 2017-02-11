/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import { syncHistoryWithStore } from 'react-router-redux';
import { googleMapsApiReady } from './actions/actions';
const apikeys = require('./apikeys');
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

global.googleMapsReadyCallback = () => store.dispatch(googleMapsApiReady(global.google.maps));
const mapsScript = document.createElement("script");
mapsScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${apikeys.GoogleMaps}&callback=googleMapsReadyCallback`);
mapsScript.setAttribute('async', true);
mapsScript.setAttribute('defer', true);
document.head.appendChild(mapsScript);
