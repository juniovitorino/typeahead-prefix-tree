const fs = require('fs');
const { PrefixTree } = require('./lib/PrefixTree')
// const NamesData = fs.createReadStream('./test.json');
const NamesData = fs.createReadStream('./names.json');

NamesData.on('data', (chunk) => {
  const data = JSON.parse(chunk.toString())
  Object.keys(data).map(key => {
    const times = parseInt(data[key])
    if (!isNaN(times)) PrefixTree.insert({ key, times })
  })
});

NamesData.on('error', err => { throw err })
module.exports = { PrefixTree }
