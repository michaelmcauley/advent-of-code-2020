const { parseFileToLines } = require("./utils/file-utils.js")
const { describe, it, expect } = require("./utils/test-utils.js")

class Passport {
  static requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  constructor(input) {
    input.split(/\s|\n/).forEach(pair => {
      const [key, value] = pair.split(':')
      this[key] = value;
    })
  }
  doesHaveRequiredFields() {
    let _doesHaveRequiredFields = true;
    Passport.requiredFields.forEach(requiredField => {
      if (!this[requiredField]) {
        _doesHaveRequiredFields = false
      }
    })
    return _doesHaveRequiredFields
  }
  isValid() {
    if (!this.doesHaveRequiredFields()) {
      return false
    }
    const byr = parseInt(this.byr)
    const iyr = parseInt(this.iyr)
    const eyr = parseInt(this.eyr)
    const hgt = /^(\d+)(cm|in)$/.exec(this.hgt)
    const hcl = /^#[0-9a-f]{6}/.exec(this.hcl)
    const ecl = /^amb|blu|brn|gry|grn|hzl|oth$/.exec(this.ecl)
    const pid = /^[0-9]{9}$/.exec(this.pid)
    if (!byr | byr < 1920 || byr > 2002) {
      return false
    }
    if (!iyr | iyr < 2010 || iyr > 2020) {
      return false
    }
    if (!eyr | eyr < 2020 || eyr > 2030) {
      return false
    }
    if (!hgt) {
      return false
    } else {
      if (hgt[2] === 'cm' && (hgt[1] < 150 || hgt[1] > 193)) {
        return false
      }
      if (hgt[2] === 'in' && (hgt[1] < 59 || hgt[1] > 76)) {
        return false
      }
    }
    if (!hcl) {
      return false
    }
    if (!ecl) {
      return false
    }
    if (!pid) {
      return false
    }
    return true
  }
}

function createPassportsFromDataFile(filename) {
  const data = parseFileToLines(`${__dirname}/inputs/${filename}`)
  const passports = []
  let passportData;
  for (let line = 0; line <= data.length; line++) {
    if (!data[line]) {
      passports.push(new Passport(passportData))
      passportData = ''
    } else {
      passportData = passportData ? `${passportData} ${data[line]}` : data[line]
    }
  }
  return passports
}

describe('day 4', () => {
  describe('puzzle 1', () => {
    const examplePassports = createPassportsFromDataFile('day-04.example.txt')
    it('parses correct number of passports', () => {
      expect(examplePassports.length).toEqual(4)
    })
    it('count correct number of valid passports', () => {
      const validPassports = examplePassports.filter(passport => passport.doesHaveRequiredFields()).length
      expect(validPassports).toEqual(2)
    })
  })
  describe('puzzle 2', () => {
    describe('invalid passports', () => {
      const passports = createPassportsFromDataFile('day-04-invalid.example.txt')
      it('parses correct number of passports', () => {
        expect(passports.length).toEqual(4)
      })
      it('correctly identifies all passports as invalid', () => {
        const validPassports = passports.filter(passport => passport.isValid()).length
        expect(validPassports).toEqual(0)
      })
    })
    describe('valid passports', () => {
      const passports = createPassportsFromDataFile('day-04-valid.example.txt')
      it('parses correct number of passports', () => {
        expect(passports.length).toEqual(4)
      })
      it('correctly identifies all passports as valid', () => {
        const validPassports = passports.filter(passport => passport.isValid()).length
        expect(validPassports).toEqual(4)
      })
    })
  })
})

const passports = createPassportsFromDataFile('day-04.txt')
const passportsWithRequiredFields = passports.filter(passport => passport.doesHaveRequiredFields()).length
const validPassports = passports.filter(passport => passport.isValid()).length
console.log('puzzle 1', { passportsWithRequiredFields })
console.log('puzzle 2', { validPassports })