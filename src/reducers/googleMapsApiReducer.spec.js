import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import googleMapsApiReducer from './googleMapsApiReducer';
import { googleMapsApiReady } from '../actions/actions';

chai.should();

describe('googleMapsApiReducer', function () {
  it('defaults to null', function () {
    expect(googleMapsApiReducer()).to.be.null;
  });

  describe('when the Google Maps API is loaded', function () {
    const api = {};
    const action = googleMapsApiReady(api);
    it('returns a reference to google.maps', function () {
      googleMapsApiReducer(null, action).should.equal(api);
    });
  });
});
