const fs = require('fs');
const NamesData = fs.createReadStream('./data/names.json');

const { PrefixTree } = require('./lib/PrefixTree')
const prefixTree = new PrefixTree()
let file = '';

NamesData.on('data', (chunk) => {
  file += chunk.toString()
});

NamesData.on('end', () => {
  const data = JSON.parse(file)

  Object.keys(data).map(key => {
    const times = parseInt(data[key])
    if (!isNaN(times)) prefixTree.insert({ key, times })
  })
})

NamesData.on('error', err => { throw err })

module.exports = { PrefixTree: prefixTree }
