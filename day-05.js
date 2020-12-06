const { parseFileToLines } = require("./utils/file-utils.js")
const { describe, it, expect } = require("./utils/test-utils.js")

function strToNumber(str, char0, char1) {
  str = str.replaceAll(char0, '0')
  str = str.replaceAll(char1, '1')
  return parseInt(str, 2)
}

class BoardingPass {
  constructor(seat) {
    this.row = strToNumber(seat.slice(0, 7), 'F', 'B')
    this.column = strToNumber(seat.slice(7, 10), 'L', 'R')
  }
  get seatId() {
    return (this.row * 8) + this.column
  }
}

describe('day 5', () => {
  describe('part 1', () => {
    it('calculates row, column, and seatId for examples', () => {
      const example1 = new BoardingPass('FBFBBFFRLR')
      expect(example1.row).toEqual(44)
      expect(example1.column).toEqual(5)
      expect(example1.seatId).toEqual(357)
      const example2 = new BoardingPass('BFFFBBFRRR')
      expect(example2.row).toEqual(70)
      expect(example2.column).toEqual(7)
      expect(example2.seatId).toEqual(567)
      const example3 = new BoardingPass('FFFBBBFRRR')
      expect(example3.row).toEqual(14)
      expect(example3.column).toEqual(7)
      expect(example3.seatId).toEqual(119)
      const example4 = new BoardingPass('BBFFBBFRLL')
      expect(example4.row).toEqual(102)
      expect(example4.column).toEqual(4)
      expect(example4.seatId).toEqual(820)
    })
  })
})

const seats = parseFileToLines(`${__dirname}/inputs/day-05.txt`)
const passes = seats.map(seat => new BoardingPass(seat))
const seatIds = passes.map(pass => pass.seatId)
const highestSeatId = Math.max(...seatIds)
console.log({ highestSeatId })