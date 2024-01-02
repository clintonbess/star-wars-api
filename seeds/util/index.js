const fs = require('fs')
const path = require('path')

function convertKeysToIntegerList({ data, keysToConvert }) {
  keysToConvert.forEach((key) => {
    if (data[key] && typeof data[key] === 'string') {
      data[key] = data[key].split(', ').map(Number)
    }

    if (data[key] && typeof data[key] === 'number') {
      data[key] = [data[key]]
    }
  })
  return data
}

function getTableJSON(filename) {
  const jsonFilepath = path.resolve(__dirname, '../../fixtures/cleaned-tables', filename)
  const json = JSON.parse(fs.readFileSync(jsonFilepath))
  return json
}

module.exports = {
  convertKeysToIntegerList,
  getTableJSON,
}
