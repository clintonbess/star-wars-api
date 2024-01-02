const { defaults } = require('jest-config')

module.exports = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testTimeout: 5000,
}
