const Tree = {
  records: [],
  root: {
    leaves: {},
  },
  insert({ key, times }) {
    let { root, cleanKey } = this.setup(key)
    for (let character of cleanKey) {
      if (root.leaves[character] === undefined) root.leaves[character] = { leaves: {}, key: undefined, times: null }
      root = root.leaves[character]
    }
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
    this.filterTreeRecordsByRoot(root);
  },
  filterTreeRecordsByRoot(root) {
    if (root.key !== undefined && root.times !== null) this.records.push({ name: root.key, times: root.times })
    Object.keys(root.leaves).map(key => {
      if (root.key === undefined) this.filterTreeRecordsByRoot(root.leaves[key])
    })
  },
  findTreeRootByPrefix(key) {
    let { root, cleanKey } = this.setup(key)
    for (let character of cleanKey) {
      if (root.leaves[character] === undefined) return false
      root = root.leaves[character]
    }
    return root
  },
  prepareRecords(recordsLimit) {
    this.records.sort((prev, next) => next.times - prev.times)
    return this.records.slice(0, recordsLimit);
  },
  setup(key) {
    return { root: this.root, cleanKey: key.trim().toLowerCase() }
  }
}

module.exports = { PrefixTree: Tree }
