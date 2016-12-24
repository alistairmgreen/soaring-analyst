import { beforeEach, describe, it } from 'mocha';
import moment from 'moment';
import chai from 'chai';
import chaiMoment from 'chai-moment';
import parseTask from './parseTask';

chai.use(chaiMoment);
chai.should();

describe('parseTask function', function () {
  describe('given a valid task', function () {
    const taskLines = [
      "C130515091441000000000004",
      "C0000000N00000000E",
      "C5156040N00038120WLeighton Buzzard NE",
      "C5215195N00043254EBury St Edmunds",
      "C5116747N00224600WRadstock",
      "C5119786N00115018WKingsclere",
      "C5154985N00107885WBicester Airfield",
      "C5152304N00033074WDunstable Airfield",
      "C0000000N00000000E"];

    let task;

    beforeEach(function () {
      task = parseTask(taskLines);
    });

    it('reports that a task was declared', function () {
      task.declared.should.be.true;
    });

    it('returns the declaration date', function() {
      task.declarationDate
        .should.be.sameMoment(moment.utc([2015, 4, 13, 9, 14, 41]));
    });

    it('returns the correct number of waypoints', function () {
      task.waypoints.should.have.length(6);
    });

    it('returns the waypoint names', function () {
      task.waypoints
        .map(waypoint => waypoint.name)
        .should.deep.equal([
          "Leighton Buzzard NE",
          "Bury St Edmunds",
          "Radstock",
          "Kingsclere",
          "Bicester Airfield",
          "Dunstable Airfield"
        ]);
    });

    it('returns the waypoint latitude', function () {
      task.waypoints[0].lat.should.be.approximately(51.934, 1.0e-6);
    });

    it('returns the waypoint longitude', function () {
      task.waypoints[0].lng.should.be.approximately(-0.635333, 1.0e-6);
    });
  });

  describe('Given a task with no waypoints', function() {
    const taskLines = [
      "C130515091441000000000004",
      "C0000000N00000000E",
      "C0000000N00000000E"];

    let task;

    beforeEach(function () {
      task = parseTask(taskLines);
    });

    it('reports that no task was declared', function () {
      task.declared.should.be.false;
    });

    it('returns an empty array of waypoints', function () {
      task.waypoints.should.be.empty;
    });

    it('does not return a declaration date', function() {
      task.should.not.have.property('declarationDate');
    });

  });

  describe('Given an empty array', function() {
    let task;

    beforeEach(function () {
      task = parseTask([]);
    });

    it('reports that no task was declared', function () {
      task.declared.should.be.false;
    });

    it('returns an empty array of waypoints', function () {
      task.waypoints.should.be.empty;
    });

    it('does not return a declaration date', function() {
      task.should.not.have.property('declarationDate');
    });
  });
});
