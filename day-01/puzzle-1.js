// https://adventofcode.com/2020/day/1

const fs = require("fs");
const numbers = fs.readFileSync("puzzle-1-input.txt").toString().split("\n");

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

const pair = findPair();
console.log(pair[0] * pair[1]);
