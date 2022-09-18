const fs = require('fs')

const db = JSON.parse(fs.readFileSync('./names.json', { encoding: 'utf8' }, (error, data) => {
  if (error) throw error;
  return data;
}));

const filter = (prefix) => {
  Object.keys(db).map((item) => {
    if (item === prefix) {
      console.debug(db[item]);
    }
  })
}

module.exports = { db, filter }
