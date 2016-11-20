# Soaring Analyst

An experimental, work-in-progress rewrite of [IGCWebView](http://www.glidingweb.org/igcWebview/)
with a multi-page user interface, incorporating a task planner and editor.

It uses the [Redux](http://redux.js.org/) library for state management, and [React](https://facebook.github.io/react) to update the view automatically whenever the state changes.

## Limitations

The task planner is not yet properly implemented. It starts with a hard-coded example task
and cannot do anything except delete waypoints.

Performance is poor on pages that show a barogram, especially in Firefox. It may be necessary to swap out the graph plotting library ([Chart.js](http://www.chartjs.org/)) for a different one in order to remedy this.

## Development setup

### Prerequisites

1. Clone the repository and run `npm install` to download all required packages.
2. Obtain two Google Maps API keys and activate them for use with the Google time zone API. One of these keys should be restricted to a single domain for production use; the other should be left unrestricted so that it works on `localhost` during development.
3. Copy `src/apikeys.template.js` to `src/apikeys.dev.js` and `src/apikeys.prod.js`, then insert your keys into these files. (They are excluded from source control to keep your keys secret).

### Build scripts

For development, type:
```
npm start
```
This will start up a Webpack development server and open up the page in your default browser. *Hot reloading* is enabled, so that changing any source code file will cause the page to refresh immediately, preserving the application state whenever possible.

To run all unit tests, use the command:
```
npm test
```

To make a minified production build, with all debugging features disabled, type:
```
npm run build
```

