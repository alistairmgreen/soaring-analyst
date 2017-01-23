import objectAssign from 'object-assign';
import PromisePolyfill from 'promise-polyfill';

if (typeof (Object.assign) !== 'function') {
  Object.assign = objectAssign;
}

if (!window.Promise) {
  window.Promise = PromisePolyfill;
}
