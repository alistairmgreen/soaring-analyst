import { parseHeaderLine } from './parseHeaders';
import chai from 'chai';
import { beforeEach, describe, it } from 'mocha';

chai.should();

describe("parseHeaderLine function", function () {
  describe("given a pilot header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFPLTPilotincharge:PAUL_FRITCHE");
    });

    it('returns a "Pilot" header', function () {
      header.name.should.equal('Pilot');
    });

    it("returns the pilot's name", function () {
      header.value.should.equal("PAUL_FRITCHE");
    });
  });

  describe("given a crew member 2 header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFCM2Crew2:CopilotName");
    });

    it('returns a "Crew member 2" header', function () {
      header.name.should.equal('Crew member 2');
    });

    it("returns the second crew member's name", function () {
      header.value.should.equal("CopilotName");
    });
  });

  describe("given a crew member 2 header without a name", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFCM2Crew2:");
    });

    it('returns a "Crew member 2" header', function () {
      header.name.should.equal('Crew member 2');
    });

    it("returns an empty string", function () {
      header.value.should.equal("");
    });
  });

  describe("given a glider type header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFGTYGliderType:LS 4");
    });

    it('returns a "Glider type" header', function () {
      header.name.should.equal('Glider type');
    });

    it("returns the glider type", function () {
      header.value.should.equal("LS 4");
    });
  });

  describe("given a glider ID header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFGIDGliderID:G-ABCD");
    });

    it('returns a "Glider ID" header', function () {
      header.name.should.equal('Glider ID');
    });

    it("returns the glider registration", function () {
      header.value.should.equal("G-ABCD");
    });
  });

  describe("given a GPS datum header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFDTM100GPSDatum:WGS84");
    });

    it('returns a "GPS datum" header', function () {
      header.name.should.equal('GPS datum');
    });

    it("returns the GPS datum name", function () {
      header.value.should.equal("WGS84");
    });
  });

  describe("given a firmware version header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFRFWFirmwareVersion:Flarm-IGC05.09");
    });

    it('returns a "Firmware version" header', function () {
      header.name.should.equal('Firmware version');
    });

    it("returns the version number", function () {
      header.value.should.equal("Flarm-IGC05.09");
    });
  });

  describe("given a hardware version header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFRHWHardwareVersion:Flarm-IGC06");
    });

    it('returns a "Hardware version" header', function () {
      header.name.should.equal('Hardware version');
    });

    it("returns the version number", function () {
      header.value.should.equal("Flarm-IGC06");
    });
  });

  describe("given a flight recorder type header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFFTYFRType:Flarm-IGC");
    });

    it('returns a "Flight recorder type" header', function () {
      header.name.should.equal('Flight recorder type');
    });

    it("returns the flight recorder type", function () {
      header.value.should.equal("Flarm-IGC");
    });
  });

  describe("given a GPS chipset header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFGPSu-blox:LEA-4P,16,8191");
    });

    it('returns a "GPS" header', function () {
      header.name.should.equal('GPS');
    });

    it("returns the chipset", function () {
      header.value.should.equal("LEA-4P,16,8191");
    });
  });

  describe("given a pressure sensor header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFPRSPressAltSensor:Intersema MS5534B,8191");
    });

    it('returns a "Pressure sensor" header', function () {
      header.name.should.equal('Pressure sensor');
    });

    it("returns the pressure sensor type", function () {
      header.value.should.equal("Intersema MS5534B,8191");
    });
  });

  describe("given a security suspect header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFFRSSECURITYSUSPECTUSEVALIPROGRAM:Seal broken");
    });

    it('returns a "Security suspect" header', function () {
      header.name.should.equal('Security suspect, use validation program');
    });

    it("returns the reason for suspicion", function () {
      header.value.should.equal("Seal broken");
    });
  });

  describe("given a competition ID header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFCIDCompetitionID:L4");
    });

    it('returns a "Competition ID" header', function () {
      header.name.should.equal('Competition ID');
    });

    it("returns the competition ID", function () {
      header.value.should.equal("L4");
    });
  });

  describe("given a competition class header", function () {
    let header;
    beforeEach(function () {
      header = parseHeaderLine("HFCCLCompetitionClass:15 meter");
    });

    it('returns a "Competition class" header', function () {
      header.name.should.equal('Competition class');
    });

    it("returns the competition class", function () {
      header.value.should.equal("15 meter");
    });
  });
});
