const morgan = require('morgan')

const loggingFormat =
  ':remote-addr - :remote-user [:date[clf]] ' +
  '":method :url HTTP/:http-version" :status :res[content-length] ' +
  '":referrer" ":user-agent" ' + // to this point, this is the standard Apache 'combined' format
  ':response-time ms'

module.exports = morgan(
  process.env.NODE_ENV === 'production' ? loggingFormat : 'dev'
)
