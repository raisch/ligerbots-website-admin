const _ = require('lodash')

module.exports = {
  _,
  firstToUpper: (s) => s.charAt(0).toUpperCase() + s.slice(1)
}

_.mixin({
  isNonEmptyString: s => _.isString(s) && !_.isEmpty(s)
})
