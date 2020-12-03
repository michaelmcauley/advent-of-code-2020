// https://adventofcode.com/2020/day/1

const fileUtils = require("./utils/file-utils.js")

const numbers = fileUtils.parseFileToIntegers(`${__dirname}/inputs/day-01.txt`);

function findPair() {
  for (var i = 0; i < numbers.length; i++) {
    const num1 = parseInt(numbers[i]);
    for (var j = i + 1; j < numbers.length; j++) {
      const num2 = parseInt(numbers[j]);
      if (num1 + num2 === 2020) {
        return [num1, num2];
      }
    }
  }
}

function findTriad() {
  for (var i = 0; i < numbers.length; i++) {
    const num1 = parseInt(numbers[i]);
    for (var j = i + 1; j < numbers.length; j++) {
      const num2 = parseInt(numbers[j]);
      for (var k = j + 1; k < numbers.length; k++) {
        const num3 = parseInt(numbers[k]);
        if (num1 + num2 + num3 === 2020) {
          return [num1, num2, num3];
        }
      }
    }
  }
}

const pair = findPair();
console.log(pair[0] * pair[1]);

const triad = findTriad();
console.log(triad[0] * triad[1] * triad[2]);
