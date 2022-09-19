module.exports = {
  PrefixTreeNode: {
    leaves: [],
    end: false,

    containsKey(character) {
      return this.leaves[character] != null;
    },

    getNode(character) {
      return this.leaves[character];
    },

    putNode(character, node) {
      this.leaves[character] = node;
    },

    setEnd() {
      this.end = true;
    },

    isEnd() {
      return this.end;
    }
  }
}
