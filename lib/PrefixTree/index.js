const { PrefixTreeNode } = require('./PrefixTreeNode')

const PrefixTree = {
  rootNode: PrefixTreeNode,
  addWord(word) {
    let node = this.rootNode;
    for (let i = 0; i < word.length; i++) {
      const currentChar = word.charAt(i);
      if (!node.containsKey(currentChar)) {
        node.putNode(currentChar, PrefixTreeNode);
      }
      node = node.getNode(currentChar);
    }
    node.setEnd();
  },
  search(word) {
    let node = this.searchHelper(word);
    return node != null && node.isEnd();
  },
  searchHelper(word) {
    let node = this.rootNode;
    for (let i = 0; i < word.length; i++) {
      const currentChar = word.charAt(i);
      if (node.containsKey(currentChar)) {
        node = node.getNode(currentChar);
      } else {
        return null;
      }
    }
    return node;
  }
}

module.exports = { PrefixTree }
