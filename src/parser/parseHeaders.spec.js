import parseHeaders from './parseHeaders';
import chai from 'chai';
import { beforeEach, describe, it } from 'mocha';

chai.should();

describe('parseHeaders', function () {

  let result;

  beforeEach(function () {
    const headers = [
      "HFPLTPilotincharge:PAUL_FRITCHE",
      "HFCM2Crew2:CopilotName",
      "HFGTYGliderType:LS 4",
      "HFGIDGliderID:G-ABCD",
      "HFDTM100GPSDatum:WGS84",
      "HFRFWFirmwareVersion:Flarm-IGC05.09",
      "HFRHWHardwareVersion:Flarm-IGC06",
      "HFFTYFRType:Flarm-IGC",
      "HFGPSu-blox:LEA-4P,16,8191",
      "HFPRSPressAltSensor:Intersema MS5534B,8191",
      "HFFRSSECURITYSUSPECTUSEVALIPROGRAM:Seal broken",
      "HFCIDCompetitionID:L4",
      "HFCCLCompetitionClass:15 meter",
      "HFXXXUnrecognized header should be ignored",
      "This Is Not A Header"
    ];

    result = parseHeaders(headers);
  });

  it('returns the expected number of headers', function () {
    result.should.have.lengthOf(13);
  });

  it('returns the pilot header', function () {
    result.should.deep.include({
      name: 'Pilot',
      value: 'PAUL_FRITCHE'
    });
  });

  it('returns the crew member 2 header', function () {
    result.should.deep.include({
      name: 'Crew member 2',
      value: 'CopilotName'
    });
  });

  it('returns the glider type header', function () {
    result.should.deep.include({
      name: 'Glider type',
      value: 'LS 4'
    });
  });

  it('returns the glider ID header', function () {
    result.should.deep.include({
      name: 'Glider ID',
      value: 'G-ABCD'
    });
  });

  it('returns the GPS Datum header', function () {
    result.should.deep.include({
      name: 'GPS datum',
      value: 'WGS84'
    });
  });

  it('returns the firmware version header', function () {
    result.should.deep.include({
      name: 'Firmware version',
      value: 'Flarm-IGC05.09'
    });
  });

  it('returns the hardware version header', function () {
    result.should.deep.include({
      name: 'Hardware version',
      value: 'Flarm-IGC06'
    });
  });

  it('returns the flight recorder type header', function () {
    result.should.deep.include({
      name: 'Flight recorder type',
      value: 'Flarm-IGC'
    });
  });

  it('returns the GPS chipset header', function () {
    result.should.deep.include({
      name: 'GPS',
      value: 'LEA-4P,16,8191'
    });
  });

  it('returns the pressure sensor header', function () {
    result.should.deep.include({
      name: 'Pressure sensor',
      value: 'Intersema MS5534B,8191'
    });
  });

  it('returns the security suspect header', function () {
    result.should.deep.include({
      name: 'Security suspect, use validation program',
      value: 'Seal broken'
    });
  });

  it('returns the competition ID header', function () {
    result.should.deep.include({
      name: 'Competition ID',
      value: 'L4'
    });
  });

  it('returns the competition class header', function () {
    result.should.deep.include({
      name: 'Competition class',
      value: '15 meter'
    });
  });
});
