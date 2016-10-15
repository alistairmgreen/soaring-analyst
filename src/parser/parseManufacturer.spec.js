import chai from 'chai';
import parseManufacturer from './parseManufacturer';
import IGCException from './IGCException';

chai.should();

describe('parseManufacturer function', function () {
  describe('given a valid A-record', function() {
    let result;

    beforeEach(function() {
      result = parseManufacturer('ALXVJF8FLIGHT:1');
    });

    it('returns the manufacturer', function() {
      result.manufacturer.should.equal('LXNAV d.o.o.');
    });

    it('returns the logger serial number', function() {
      result.serial.should.equal('JF8');
    });
  });

  describe('given a valid A-record with an unrecognized manufacturer code', function() {
    let result;

    beforeEach(function() {
      result = parseManufacturer('AXYZJF8');
    });

    it('sets the manufacturer equal to the code', function() {
      result.manufacturer.should.equal('XYZ');
    });

    it('returns the logger serial number', function() {
      result.serial.should.equal('JF8');
    });
  });

  describe('given a string which does not begin with letter "A"', function() {
    it('throws an IGCException', function() {
      (() => parseManufacturer('LXVJF8FLIGHT:1')).should.throw(IGCException);
    });
  });

  describe('given an A-record with too few characters', function() {
    it('throws an IGCException', function() {
      (() => parseManufacturer('LXVJF')).should.throw(IGCException);
    });
  });
});
