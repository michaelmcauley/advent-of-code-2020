const { parseFileToLines } = require("./utils/file-utils.js")
const { describe, it, expect } = require("./utils/test-utils.js")

function sumCountsAcrossGroups(inputFilename) {
  const lines = parseFileToLines(`${__dirname}/inputs/${inputFilename}`)
  let count = 0, yesAnswers = new Set()
  for (let i = 0; i <= lines.length; i++) {
    if (!lines[i]) {
      count += yesAnswers.size
      yesAnswers.clear()
    } else {
      lines[i].split('').map(question => yesAnswers.add(question))
    }
  }
  return count
}

describe('day 6', () => {
  describe('part 1', () => {
    it('getsCorrectAnswer', () => {
      expect(sumCountsAcrossGroups('day-06.example.txt')).toEqual(11)
    })
  })
})

const countsAcrossAllGroups = sumCountsAcrossGroups('day-06.txt')
console.log({ countsAcrossAllGroups })