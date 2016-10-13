import chai from 'chai';
import MockDate from 'mockdate';
import moment from 'moment';
import {parseDateHeader} from './parseHeaders';

chai.should();

describe('parseDateHeader function', function() {
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
      result = parseDateHeader('HFDTE280414');
    });

    it('returns a header named "Date"', function() {
      result.name.should.equal("Date");
    });

    it('returns a valid moment object', function() {
      result.value.isValid().should.be.true;
    });

    it('returns a moment in UTC mode', function() {
      result.value.creationData().isUTC.should.be.true;
    });

    it('returns a year in the 21st century', function() {
      result.value.year().should.equal(2014);
    });

    it('returns the correct day of the month', function() {
      result.value.date().should.equal(28);
    });

    it('returns the correct zero-indexed month', function() {
      result.value.month().should.equal(3);
    });
  });

  describe('given a date where the two-digit year is equal to the current year', function() {
    let result;

    beforeEach(function() {
      result = parseDateHeader('HFDTE280415');
    });

    it('returns a year in the 21st century', function() {
      result.value.year().should.equal(2015);
    });
  });

  describe('given a date where the two-digit year is greater than the current year', function() {
    let result;

    beforeEach(function() {
      result = parseDateHeader('HFDTE280495');
    });

    it('returns a year in the 20th century', function() {
      result.value.year().should.equal(1995);
    });
  });
});
