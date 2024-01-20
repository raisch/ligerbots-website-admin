const _ = require('lodash')
const bcrypt = require('bcryptjs')

module.exports = {
  _,
  firstToUpper: (s) => s.charAt(0).toUpperCase() + s.slice(1),
  createHashedPassword: (str) => bcrypt.hashSync(str, 10)
}

_.mixin({
  isNonEmptyString: s => _.isString(s) && !_.isEmpty(s)
})
