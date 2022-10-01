const { PrefixTree } = require('../store')

module.exports = {
  // Filter Records by User's inputed chars
  filterByPrefix: (req, res) => {
    res.json(PrefixTree.filterByPrefix({ prefix: req.params?.prefix, recordsLimit: process.env.SUGGESTION_NUMBER }))
  },
  // Filter all records sorted by times (popularity)
  filterByPopularity: (_, res) => res.json(PrefixTree.filterByPopularity(process.env.SUGGESTION_NUMBER)),

  // Increate times (popularity) by one
  increasePopularity: (req, res) => {
    try {
      const record = PrefixTree.increaseRecordPopularity(req.body?.name)
      res.json(record)
    } catch (e) {
      res.status(e.status).send(e)
    }
  }
} 
