import {expect} from 'chai';
import MockDate from 'mockdate';
import moment from 'moment';
import parseHeaders from './parseHeaders';

describe('parseHeaders function', function() {
  const fakeNow = moment.utc([2015, 9, 10, 23, 0, 0]);

  beforeEach(function() {
    MockDate.set(fakeNow);
  });

  afterEach(function() {
    MockDate.reset();
  });

  describe('given a date where the two-digit year is less than the current year', function() {
    let result;

    beforeEach(function() {
      result = parseHeaders(['HFDTE280414'])[0];
    });

    it('returns a header named "Date"', function() {
      expect(result.name).to.equal("Date");
    });

    it('returns a valid moment object', function() {
      expect(result.value.isValid()).to.be.true;
    });

    it('returns a moment in UTC mode', function() {
      expect(result.value.creationData().isUTC).to.be.true;
    });

    it('returns a year in the 21st century', function() {
      expect(result.value.year()).to.equal(2014);
    });

    it('returns the correct day of the month', function() {
      expect(result.value.date()).to.equal(28);
    });

    it('returns the correct zero-indexed month', function() {
      expect(result.value.month()).to.equal(3);
    });
  });

  describe('given a date where the two-digit year is equal to the current year', function() {
    let result;

    beforeEach(function() {
      result = parseHeaders(['HFDTE280415'])[0];
    });

    it('returns a header named "Date"', function() {
      expect(result.name).to.equal("Date");
    });

    it('returns a valid moment object', function() {
      expect(result.value.isValid()).to.be.true;
    });

    it('returns a moment in UTC mode', function() {
      expect(result.value.creationData().isUTC).to.be.true;
    });

    it('returns a year in the 21st century', function() {
      expect(result.value.year()).to.equal(2015);
    });

    it('returns the correct day of the month', function() {
      expect(result.value.date()).to.equal(28);
    });

    it('returns the correct zero-indexed month', function() {
      expect(result.value.month()).to.equal(3);
    });
  });

  describe('given a date where the two-digit year is greater than the current year', function() {
    let result;

    beforeEach(function() {
      result = parseHeaders(['HFDTE280495'])[0];
    });

    it('returns a header named "Date"', function() {
      expect(result.name).to.equal("Date");
    });

    it('returns a valid moment object', function() {
      expect(result.value.isValid()).to.be.true;
    });

    it('returns a moment in UTC mode', function() {
      expect(result.value.creationData().isUTC).to.be.true;
    });

    it('returns a year in the 20th century', function() {
      expect(result.value.year()).to.equal(1995);
    });

    it('returns the correct day of the month', function() {
      expect(result.value.date()).to.equal(28);
    });

    it('returns the correct zero-indexed month', function() {
      expect(result.value.month()).to.equal(3);
    });
  });

});
