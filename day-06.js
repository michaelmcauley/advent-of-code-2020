const { parseFileToLines } = require("./utils/file-utils.js")
const { describe, it, expect } = require("./utils/test-utils.js")

function sumCountsAcrossGroups(inputFilename, countingMode) {
  const lines = parseFileToLines(`${__dirname}/inputs/${inputFilename}`)
  let count = 0, yesAnswers = new Set(), isFirstInGroup = true
  for (let i = 0; i <= lines.length; i++) {
    if (!lines[i]) {
      count += yesAnswers.size
      yesAnswers.clear()
      isFirstInGroup = true
    } else {
      if (countingMode === 'any' || isFirstInGroup) {
        lines[i].split('').map(question => yesAnswers.add(question))
      } else {
        const yesAnswersThisLine = new Set(lines[i].split(''))
        const yesAnswersPrior = Array.from(yesAnswers)
        yesAnswersPrior.forEach(question => {
          if (!yesAnswersThisLine.has(question)) {
            yesAnswers.delete(question)
          }
        })
      }
      isFirstInGroup = false
    }
  }
  return count
}

describe('day 6', () => {
  describe('part 1', () => {
    it('getsCorrectAnswer', () => {
      expect(sumCountsAcrossGroups('day-06.example.txt', 'any')).toEqual(11)
    })
  })
  describe('part 2', () => {
    it('getsCorrectAnswer', () => {
      expect(sumCountsAcrossGroups('day-06.example.txt', 'all')).toEqual(6)
    })
  })
})

const countsAnyAcrossAllGroups = sumCountsAcrossGroups('day-06.txt', 'any')
const countsAllAcrossAllGroups = sumCountsAcrossGroups('day-06.txt', 'all')
console.log({ countsAnyAcrossAllGroups })
console.log({ countsAllAcrossAllGroups })