import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS } from 'immutable';

import taskReducer from './taskReducer';
import { initialTask } from './initialState';
import * as actions from '../actions/actions';

chai.use(chaiImmutable);
chai.should();

describe('Task reducer', function () {

  it('has an initial state', function () {
    taskReducer(undefined, {}).should.equal(initialTask);
  });

  it('performs no operation if it does not recognise the action', function () {
    taskReducer(initialTask, { type: 'Unknown action' })
      .should.equal(initialTask);
  });

  describe('on DELETE_TURNPOINT action', function () {
    const initialState = fromJS([
      {
        name: "Turnpoint A",
        position: {
          lat: 51.0,
          lng: -1.0
        }
      },
      {
        name: "Turnpoint B",
        position: {
          lat: 52.0,
          lng: 1.0
        }
      },
      {
        name: "Turnpoint C",
        position: {
          lat: 53.0,
          lng: -0.5
        }
      }
    ]);

    let finalState = taskReducer(initialState, actions.deleteTurnpoint(1));

    it('deletes the specified turn point', function () {
      finalState.should.equal(fromJS([
        {
          name: "Turnpoint A",
          position: {
            lat: 51.0,
            lng: -1.0
          }
        },
        {
          name: "Turnpoint C",
          position: {
            lat: 53.0,
            lng: -0.5
          }
        }
      ]));
    });
  });
});
