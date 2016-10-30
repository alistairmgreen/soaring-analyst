import { describe, it } from 'mocha';
import chai from 'chai';
import calculateBounds from './calculateBounds';

chai.should();

describe('calculateBounds', function () {
  const points = [
    { lat: -1, lng: -2 },
    { lat: 1, lng: 2 },
    { lat: 3, lng: 0 }
  ];

  it('returns the bounds of the given points', function () {
    calculateBounds(points)
      .should.deep.equal({
        north: 3,
        south: -1,
        west: -2,
        east: 2
      });
  });
});
