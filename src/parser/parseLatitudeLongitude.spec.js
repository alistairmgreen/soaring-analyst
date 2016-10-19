import { describe, it } from 'mocha';
import chai from 'chai';
import parseLatitudeLongitude from './parseLatitudeLongitude';

chai.should();

describe('parseLatitudeLongitude function', function () {
  describe('Given a northern latitude and eastern longitude', function () {
    let result;

    beforeEach(function () {
      result = parseLatitudeLongitude("5215195N00043254E");
    });

    it('returns positive latitude as decimal degrees', function() {
      result.lat.should.be.approximately(52.253250, 1.0e-7);
    });

    it('returns positive longitude as decimal degrees', function() {
      result.lng.should.be.approximately(0.720900, 1.0e-7);
    });

    it('gives a formatted string', function () {
      result.format().should.equal("52°15.195'N, 0°43.254'E");
    });
  });

  describe('Given a southern latitude and western longitude', function () {
    let result;

    beforeEach(function () {
      result = parseLatitudeLongitude("5215195S00043254W");
    });

    it('returns negative latitude as decimal degrees', function() {
      result.lat.should.be.approximately(-52.253250, 1.0e-7);
    });

    it('returns negative longitude as decimal degrees', function() {
      result.lng.should.be.approximately(-0.720900, 1.0e-7);
    });

    it('gives a formatted string', function () {
      result.format().should.equal("52°15.195'S, 0°43.254'W");
    });
  });
});
