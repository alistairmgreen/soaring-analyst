import chai from 'chai';
import * as actions from './actions';

chai.should();

describe("Action creators", function () {

  describe("deleteTurnpoint", function () {
    const DELETE_INDEX = 5;
    let deleteAction;

    beforeEach(function () {
      deleteAction = actions.deleteTurnpoint(DELETE_INDEX);
    });

    it('sets the action type', function () {
      deleteAction.type.should.equal(actions.DELETE_TURNPOINT);
    });

    it('sets the index of the turnpoint to delete', function () {
      deleteAction.index.should.equal(DELETE_INDEX);
    });
  });
});
