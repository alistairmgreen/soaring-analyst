import { describe, it, beforeEach } from 'mocha';
import chai from 'chai';
import splitLines from './splitLines';

chai.should();

describe("splitLines function", function () {
  describe("given valid IGC data", function () {
    const manufacturerSerial = "ALXVJF8FLIGHT:1";

    const dateHeader = "HFDTE130515";

    const headerLines = [
      "HFFXA015",
      "HFPLTPILOT:Robin May",
      "HFGTYGLIDERTYPE:ASH 25E",
      "HFGIDGLIDERID:DKOOL"
    ];

    const taskLines = [
      "C270915101604000000000003",
      "C0000000N00000000ETAKEOFF",
      "C5436166N02402083EBIRSTONAS",
      "C5428666N02328433EGELEZINIAI",
      "C5443250N02313266EPILVISKIAI",
      "C5424866N02403500EALYTUS",
      "C5439183N02403466EPOCIUNAI",
      "C0000000N00000000ELANDING"];

    const fixLines = [
      "B1016045437607N02400188EA006170067600000",
      "B1016065437619N02400144EA006110066400000",
      "B1016075437623N02400118EA006090066500000"
    ];

    let lines;

    beforeEach(function () {
      let igcString = [
        manufacturerSerial,
        dateHeader,
        ...headerLines,
        ...taskLines,
        ...fixLines].join("\r\n");

      lines = splitLines(igcString);
    });

    it("returns the serial number line", function () {
      lines.serialNumber.should.equal(manufacturerSerial);
    });

    it("returns the date header line", function () {
      lines.dateHeader.should.equal(dateHeader);
    });

    it("returns an array of header lines excluding the date", function () {
      lines.headers.should.deep.equal(headerLines);
    });

    it("returns an array of task declaration lines", function () {
      lines.task.should.deep.equal(taskLines);
    });

    it("returns an array of position fixes", function () {
      lines.fixes.should.deep.equal(fixLines);
    });
  });
});
