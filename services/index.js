const { filter } = require("../store")

module.exports = {
  search: (req, res) => {
    const { prefix } = req.params || ''
    res.send(filter(prefix))
  }
} 
