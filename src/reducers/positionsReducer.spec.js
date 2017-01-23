import { describe, it } from 'mocha';
import chai from 'chai';
import { List, Map } from 'immutable';
import chaiImmutable from 'chai-immutable';
import positionsReducer from './positionsReducer';
import { loadFileSuccess } from '../actions/actions';

chai.should();
chai.use(chaiImmutable);

describe('positionsReducer', function () {
  describe('initial state', function () {
    let initialState;
    beforeEach(function () {
      initialState = positionsReducer();
    });

    it('is an immutable list', function () {
      initialState.should.be.an.instanceOf(List);
    });

    it('is empty', function () {
      initialState.should.be.empty;
    });
  });

  describe('when a file is loaded', function () {
    let state;
    beforeEach(function () {
      const loggerTrace = {
        fixes: [
          { position: { lat: 1, lng: 2, formatted: '1N, 2E'} },
          { position: { lat: 3, lng: 4, formatted: '3N, 4E'} }
        ]
      };

      const action = loadFileSuccess('filename.igc', loggerTrace);

      state = positionsReducer(List(), action);
    });

    it('sets the state to an immutable list', function () {
      state.should.be.an.instanceOf(List);
    });

    it('sets an immutable list of latitudes and longitudes', function () {
      state.should.equal(List.of(
        Map({ lat: 1, lng: 2, formatted: '1N, 2E' }),
        Map({ lat: 3, lng: 4, formatted: '3N, 4E' })
      ));
    });
  });
});
