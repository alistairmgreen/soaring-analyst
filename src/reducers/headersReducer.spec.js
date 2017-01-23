import { describe, it } from 'mocha';
import chai from 'chai';
import { List } from 'immutable';
import chaiImmutable from 'chai-immutable';
import headersReducer from './headersReducer';
import { loadFileSuccess } from '../actions/actions';

chai.should();
chai.use(chaiImmutable);

describe('Headers reducer', function () {
  describe('initial state', function () {
    let initialState;
    beforeEach(function () {
      initialState = headersReducer();
    });

    it('is an immutable list', function () {
      initialState.should.be.an.instanceOf(List);
    });

    it('is empty', function () {
      initialState.should.be.empty;
    });
  });

  describe('when a file is loaded', function () {
    const headerList = List.of(
      { name: "Pilot", value: "Neil Armstrong" },
      { name: "Glider ID", value: "G-ABCD" }
    );

    let state;

    beforeEach(function () {
      const action = loadFileSuccess('filename.igc', { headers: headerList.toArray() });
      state = headersReducer(List(), action);
    });

    it('sets the headers', function () {
      state.should.equal(headerList);
    });
  });
});
