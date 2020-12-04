const { parseFileToLines } = require("./utils/file-utils.js")
const { describe, it, expect } = require("./utils/test-utils.js")

function countTreesInTrajectory(map, slopeRight, slopeDown) {
  const totalRows = map.length;
  const totalColumns = map[0].length;
  let currentRow = 0;
  let currentColumn = 0;
  let suddenArborealStops = 0;
  while (currentRow < totalRows) {
    currentRow += slopeDown;
    currentColumn += slopeRight;
    if (currentRow < totalRows && map[currentRow].charAt(currentColumn % totalColumns) === '#') {
      suddenArborealStops += 1;
    }
  }
  return suddenArborealStops;
}

describe('toboggan trajectory', () => {
  const exampleMap = parseFileToLines(`${__dirname}/inputs/day-03.example.txt`);
  it('should count trees in part 1 example', () => {
    expect(countTreesInTrajectory(exampleMap, 3, 1)).toEqual(7);
  });
  it('should count trees in part 2 example', () => {
    const trees1x1 = countTreesInTrajectory(exampleMap, 1, 1);
    const trees3x1 = countTreesInTrajectory(exampleMap, 3, 1);
    const trees5x1 = countTreesInTrajectory(exampleMap, 5, 1);
    const trees7x1 = countTreesInTrajectory(exampleMap, 7, 1);
    const trees1x2 = countTreesInTrajectory(exampleMap, 1, 2);
    expect(trees1x1).toEqual(2);
    expect(trees3x1).toEqual(7);
    expect(trees5x1).toEqual(3);
    expect(trees7x1).toEqual(4);
    expect(trees1x2).toEqual(2);
    expect(trees1x1 * trees3x1 * trees5x1 * trees7x1 * trees1x2).toEqual(336);
  });
});

const map = parseFileToLines(`${__dirname}/inputs/day-03.txt`);
console.log(`Sudden arboreal stops: ${ countTreesInTrajectory(map, 3, 1) }`);

const trees1x1 = countTreesInTrajectory(map, 1, 1);
const trees3x1 = countTreesInTrajectory(map, 3, 1);
const trees5x1 = countTreesInTrajectory(map, 5, 1);
const trees7x1 = countTreesInTrajectory(map, 7, 1);
const trees1x2 = countTreesInTrajectory(map, 1, 2);

console.log(`Part 2 answer: ${trees1x1 * trees3x1 * trees5x1 * trees7x1 * trees1x2}`);
