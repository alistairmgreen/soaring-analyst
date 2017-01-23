import { describe, it } from 'mocha';
import chai from 'chai';
import fileNameReducer from './fileNameReducer';
import { fileLoading } from '../actions/actions';

chai.should();

describe('File name reducer', function () {
  it('defaults to an empty file name', function () {
    fileNameReducer().should.be.an.empty.string;
  });

  describe('when a file load begins', function () {
    it('sets the file name', function () {
      const FILENAME = 'filename.igc';

      fileNameReducer("", fileLoading(FILENAME))
        .should.equal(FILENAME);
    });
  });
});
