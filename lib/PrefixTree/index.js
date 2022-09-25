const Tree = {
  records: [],
  root: {
    leaves: {},
  },
  insert({ key, times }) {
    let { root, cleanKey } = this.setup(key)
    for (let character of cleanKey) {
      if (root.leaves[character] === undefined) root.leaves[character] = { leaves: {}, key: undefined, times: null, end: false }
      root = root.leaves[character]
    }
    root.end = true
    root.times = times
    root.key = key
  },
  searchByKey(key) {
    const root = this.findTreeRootByPrefix(key)
    return { name: root.key, times: root.times };
  },
  filterByPrefix({ prefix, recordsLimit }) {
    this.records = []
    this.filterRecords(prefix)
    return this.prepareRecords(recordsLimit)
  },
  filterByPopularity(recordsLimit) {
    this.records = []
    this.filterTreeRecordsByRoot(this.root)
    return this.prepareRecords(recordsLimit)
  },
  filterRecords(prefix) {
    let root = this.findTreeRootByPrefix(prefix);
    // if (root && root.end) {
    //   this.updateRecords({ name: root.key, times: root.times })
    //   return;
    // }
    if (root) this.filterTreeRecordsByRoot(root);
  },
  updateRecords({ name, times }) {
    this.records.push({ name, times })
  },
  filterTreeRecordsByRoot(root) {
    const rootKeys = Object.keys(root.leaves)
    if (root.end) this.updateRecords({ name: root.key, times: root.times })
    rootKeys.map(key => this.filterTreeRecordsByRoot(root.leaves[key]))
  },
  findTreeRootByPrefix(key) {
    let { root, cleanKey } = this.setup(key)
    for (let character of cleanKey) {
      if (root.leaves[character] === undefined) return false
      root = root.leaves[character]
    }
    return root
  },
  increaseRecordPopularity(key) {
    const root = this.findTreeRootByPrefix(key)
    if (root.key === undefined) throw { message: "Record not found.", status: 400 };
    return { name: root.key, times: ++root.times };
  },
  prepareRecords(recordsLimit) {
    this.records.sort((first, second) => {
      if (first.times === second.times) return second.key?.localeCompare(first?.key)
      return second.times - first.times
    })
    return this.records.slice(0, recordsLimit);
  },
  setup(key) {
    try {
      const regex = /\s/g
      const cleanKey = key.toLowerCase().replaceAll(regex, '_').trim()
      return { root: this.root, cleanKey }
    } catch (e) {
      throw { message: "Key format is invalid", status: 400 }
    }
  }
}

module.exports = { PrefixTree: Tree }
