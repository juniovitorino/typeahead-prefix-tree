const fs = require('fs');
const { PrefixTree } = require('./lib/PrefixTree')
const NamesData = fs.createReadStream('./names.json');

NamesData.on('data', (chunk) => {
  const data = JSON.parse(chunk.toString())
  Object.keys(data).map(key => {
    const value = parseInt(data[key])
    if (!isNaN(value)) PrefixTree.insert(key, value)
  })
});

NamesData.on('error', err => { throw err })
module.exports = { PrefixTree }
