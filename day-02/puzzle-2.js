const fs = require("fs");
const list = fs.readFileSync(`${__dirname}/puzzle-2-input.txt`).toString().split("\n");

const parsedList = list.map((listEntry) => {
  const pattern = /(\d+)\-(\d+)\s(\w):\s(\w+)/;
  const matches = pattern.exec(listEntry);
  return {
    char: matches[3],
    min: parseInt(matches[1]),
    max: parseInt(matches[2]),
    password: matches[4],
  };
});

let validPasswords = 0;

parsedList.forEach((listEntry) => {
  const occurrences = listEntry.password.match(new RegExp(listEntry.char, "g"));
  const numOccurrences = occurrences ? occurrences.length : 0;
  if (numOccurrences <= listEntry.max && numOccurrences >= listEntry.min) {
    validPasswords += 1;
  }
});

console.log(validPasswords);

validPasswords = 0;

parsedList.forEach((listEntry) => {
  const posA = listEntry.min;
  const posB = listEntry.max;
  const posAMatch = listEntry.password.charAt(posA - 1) === listEntry.char;
  const posBMatch = listEntry.password.charAt(posB - 1) === listEntry.char;
  if (posAMatch ^ posBMatch) {
    validPasswords += 1;
  }
});

console.log(validPasswords);
