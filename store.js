const fs = require('fs');
const { PrefixTree } = require('./lib/PrefixTree')

const NamesData = fs.createReadStream('./names.json');

NamesData.on('data', (chunk) => {
  Object.keys(JSON.parse(chunk.toString())).map(name => PrefixTree.addWord(name))
});

NamesData.on('error', (err) => {
  throw err;
})

module.exports = { PrefixTree }
