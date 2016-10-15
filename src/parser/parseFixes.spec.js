import { beforeEach, describe, it } from 'mocha';
import moment from 'moment';
import chai from 'chai';
import chaiMoment from 'chai-moment';
import parseFixes, { splitBRecord } from './parseFixes';
import parseLatitudeLongitude from './parseLatitudeLongitude';

chai.use(chaiMoment);
chai.should();

describe('splitBRecord function', function () {
  let result;
  beforeEach(function () {
    result = splitBRecord('B0941285152250N00032612WA00101001470079990156800000010-00070187');
  });

  it('returns the UTC time', function () {
    result.utcTime.should.equal('094128');
  });

  it('returns the latitude and longitude', function () {
    result.latitudeLongitude.should.equal('5152250N00032612W');
  });

  it('returns the fix validity', function () {
    result.validity.should.equal('A');
  });

  it('returns the pressure altitude', function () {
    result.pressureAltitude.should.equal('00101');
  });

  it('returns the GPS altitude', function () {
    result.gpsAltitude.should.equal('00147');
  });
});

describe('parseFixes function', function () {
  describe('given one valid 3D position fix', function () {
    const igcLines = {
      dateHeader: 'HFDTE130515',

      fixes: [
        'B0941285152250N00032612WA00101001470079990156800000010-00070187'
      ]
    };
    const expectedLatLng = parseLatitudeLongitude("5152250N00032612W");

    let result;

    beforeEach(function () {
      result = parseFixes(igcLines);
    });

    it('returns one position fix', function () {
      result.should.have.length(1);
    });

    it('returns the time and date as a UTC moment', function () {
      result[0]
        .timestamp
        .creationData().isUTC
        .should.be.true;
    });

    it('returns the correct time and date', function () {
      result[0].timestamp
        .should.be.sameMoment(moment.utc([2015, 4, 13, 9, 41, 28]));
    });

    it('returns the GPS altitude', function () {
      result[0].gpsAltitude.should.equal(147);
    });

    it('returns the pressure altitude', function () {
      result[0].pressureAltitude.should.equal(101);
    });

    it('reports a valid 3D GPS fix', function () {
      result[0].validGpsAltitude.should.be.true;
    });

    it('returns the latitude', function () {
      result[0].position.lat
        .should.equal(expectedLatLng.lat);
    });

    it('returns the longitude', function () {
      result[0].position.lng
        .should.equal(expectedLatLng.lng);
    });
  });

  describe('when a flight crosses midnight UTC', function () {
    const igcLines = {
      dateHeader: 'HFDTE130515',

      fixes: [
        'B2359595152250N00032612WA00101001470079990156800000010-00070187',
        'B0000015152250N00032612WA00101001470079990156800000010-00070187'
      ]
    };

    let result;
    beforeEach(function () {
      result = parseFixes(igcLines);
    });

    it('uses the date from the header before midnight', function () {
      result[0].timestamp.date().should.equal(13);
    });

    it('sets the date to the following day when the time is after midnight', function () {
      result[1].timestamp.date().should.equal(14);
    });
  });
});
