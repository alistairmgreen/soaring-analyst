import { describe, it } from 'mocha';
import chai from 'chai';
import { List, Map, fromJS } from 'immutable';
import chaiImmutable from 'chai-immutable';
import taskReducer from './taskReducer';
import * as actions from '../../actions/actions';

chai.use(chaiImmutable);
chai.should();

describe('taskReducer', function () {
  describe('default state', function () {
    it('is an immutable list', function () {
      taskReducer().should.be.an.instanceOf(List);
    });
  });

  const turnpointA = Map({
    name: "Turnpoint A",
    lat: 51.0,
    lng: -1.0
  });

  const turnpointB = Map({
    name: "Turnpoint B",
    lat: 52.0,
    lng: 1.0
  });

  const turnpointC = Map(
    {
      name: "Turnpoint C",
      lat: 53.0,
      lng: -0.5
    }
  );

  describe('on DELETE_TURNPOINT action', function () {
    const initialState = List.of(turnpointA, turnpointB, turnpointC);

    const finalState = taskReducer(initialState, actions.deleteTurnpoint(1));

    it('deletes the specified turn point', function () {
      finalState
        .should.equal(List.of(turnpointA, turnpointC));
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
              lat: 1.2,
              lng: 3.4
            },
            {
              name: 'two',
              lat: 4.5,
              lng: 5.6
            }
          ]
        }
      };

      let loadAction = actions.loadFileSuccess('filename.igc', loggerTrace);

      let newState;

      beforeEach(function () {
        newState = taskReducer(List(), loadAction);
      });

      it('sets the task waypoints from the logger trace', function () {
        newState
          .should.equal(fromJS(loggerTrace.task.waypoints));
      });
    });

    describe('when the logger trace has no task declaration', function () {
      const loggerTrace = {
        task: {
          declared: false,
          waypoints: []
        }
      };

      const initialTask = List.of(turnpointA, turnpointB, turnpointC);
      const loadAction = actions.loadFileSuccess('filename.igc', loggerTrace);

      let newState;

      beforeEach(function () {
        newState = taskReducer(initialTask, loadAction);
      });

      it('leaves any existing task unchanged', function () {
        newState.should.equal(initialTask);
      });
    });
  });
});
