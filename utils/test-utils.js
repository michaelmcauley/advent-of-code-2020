const { leftPad } = require('./string-utils');

const describe = (description, fn) => {
  this.currDepth = this.currDepth === undefined ? 0 : this.currDepth + 1;
  console.log(leftPad(description, this.currDepth * 2));
  fn();
  this.currDepth -= 1;
}

const it = (description, fn) => {
  this.hasError = false;
  this.currDepth += 1;
  try {
    fn()
  } catch (error) {
    this.hasError = true;
    this.errorMessage = error.message;
  }
  if (this.hasError) {
    console.log(leftPad(`\x1b[31m× ${description}\x1b[0m`, this.currDepth * 2));
    console.log(leftPad(this.errorMessage, (this.currDepth + 1) * 2));
  } else {
    console.log(leftPad(`\x1b[32m✓ ${description}\x1b[0m`, this.currDepth * 2));
  }
  this.currDepth -= 1;
}

const expect = (leftExpression) => {
  return {
    toEqual: function(rightExpression) {
      if (leftExpression != rightExpression) {
        throw new Error(`expected ${leftExpression} to equal ${rightExpression}`);
      }
    }
  }
}

module.exports = {
  describe,
  it,
  expect
}