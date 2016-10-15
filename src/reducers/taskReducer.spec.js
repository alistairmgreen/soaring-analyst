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

  describe('When a logger trace is loaded', function () {
    describe('when the logger trace contains a task declaration', function () {
      const loggerTrace = {
        task: {
          declared: true,
          waypoints: [
            {
              name: 'one',
              position: {
                lat: 1.2,
                lng: 3.4
              }
            },
            {
              name: 'two',
              position: {
                lat: 4.5,
                lng: 5.6
              }
            }
          ]
        }
      };

      let loadAction = actions.loadFileSuccess('filename.igc', loggerTrace);

      let newState;

      beforeEach(function() {
        newState = taskReducer(initialTask, loadAction);
      });

      it('sets the task from the logger trace', function () {
        newState.should.equal(fromJS(loggerTrace.task.waypoints));
      });
    });

    describe('when the logger trace has no task declaration', function () {
      const loggerTrace = {
        task: {
          declared: false,
          waypoints: []
        }
      };

      let loadAction = actions.loadFileSuccess('filename.igc', loggerTrace);

      let newState;

      beforeEach(function() {
        newState = taskReducer(initialTask, loadAction);
      });

      it('leaves any existing task unchanged', function () {
        newState.should.equal(initialTask);
      });
    });
  });
});
