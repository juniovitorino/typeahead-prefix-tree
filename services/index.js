const { PrefixTree } = require('../store')

module.exports = {
  filterByPrefix: (req, res) => {
    res.json(PrefixTree.filterByPrefix(req.params.prefix, process.env.SUGGESTION_NUMBER))
  }
} 
