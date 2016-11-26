import { describe, it } from 'mocha';
import chai from 'chai';

import { fileLoading, loadFileSuccess, loadFileFailure } from '../actions/actions';

import * as STATUS from '../constants/loadingStatus';

import loadingStatusReducer from './loadingStatusReducer';

chai.should();

describe('Loading status reducer', function () {
  it('defaults to "no file loaded"', function () {
    loadingStatusReducer().should.equal(STATUS.NO_FILE_LOADED);
  });

  describe('when a file load is triggered', function () {
    it('sets the status to "load in progress"', function () {
      loadingStatusReducer(STATUS.NO_FILE_LOADED, fileLoading('filename.igc'))
        .should.equal(STATUS.LOAD_IN_PROGRESS);
    });
  });

  describe('when a file load succeeds', function () {
    it('sets the status to "file loaded"', function () {
      loadingStatusReducer(STATUS.LOAD_IN_PROGRESS, loadFileSuccess('filename.igc', {}))
        .should.equal(STATUS.FILE_LOADED);
    });
  });

  describe('when a file load fails', function () {
    it('sets the status to "no file loaded"', function () {
      loadingStatusReducer(STATUS.LOAD_IN_PROGRESS, loadFileFailure("error message"))
        .should.equal(STATUS.NO_FILE_LOADED);
    });
  });
});
