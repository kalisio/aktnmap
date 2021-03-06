const path = require('path')

// USe default app config
const config = require(path.join(__dirname, '../../config/default'))

// Simply changes outputs so we don't pollute DB, logs, etc.
config.logs.DailyRotateFile.dirname = path.join(__dirname, '..', 'logs')
config.db.url = config.db.url.replace('aktnmap', 'aktnmap-test')
delete config.authentication.defaultUsers

module.exports = config
