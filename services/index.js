const { PrefixTree } = require('../store')

module.exports = {
  filterByPrefix: (req, res) => {
    res.json(PrefixTree.filterByPrefix({ prefix: req.params.prefix, recordsLimit: process.env.SUGGESTION_NUMBER }))
  },
  filterByPopularity: (_, res) => res.json(PrefixTree.filterByPopularity(process.env.SUGGESTION_NUMBER))
} 
