const { parseFileToLines } = require("./utils/file-utils.js")
const { describe, it, expect } = require("./utils/test-utils.js")

function countTreesInTrajectory(map, slopeRight, slopeDown) {
  
}

describe('toboggan trajectory', () => {
  it('should count trees in part 1 example', () => {
    const map = parseFileToLines(`${__dirname}/inputs/day-03.example.txt`);
    expect(countTreesInTrajectory(map, 3, 1)).toEqual(7);
  });
});