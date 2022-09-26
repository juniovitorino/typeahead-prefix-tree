const Tree = {
  records: [],
  searchPrefix: '',
  exactMatchRecord: undefined,
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
    this.searchPrefix = prefix;
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
    if (root) this.filterTreeRecordsByRoot(root);
  },
  updateRecords({ key, times, end }) {
    if (key && normalizeKey(this.searchPrefix) === normalizeKey(key)) {
      this.exactMatchRecord = { name: key, times };
      return
    }
    if (key && end) this.records.push({ name: key, times })
  },
  filterTreeRecordsByRoot(root) {
    const rootKeys = Object.keys(root.leaves)
    this.updateRecords({ ...root })
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
    if (this.exactMatchRecord) this.records.unshift(this.exactMatchRecord);
    return this.records.slice(0, recordsLimit);
  },
  setup(key) {
    this.exactMatchRecord = undefined
    try {
      return { root: this.root, cleanKey: normalizeKey(key) }
    } catch (e) {
      throw { message: "Key format is invalid", status: 400 }
    }
  }
}

const normalizeKey = (string) => string.toLowerCase().replaceAll(/\s/g, '_').trim()

module.exports = { PrefixTree: Tree }
