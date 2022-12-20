export function tree2list(root, list) {
  if (!root) return;
  list.push(root);
  (root.Children || []).forEach(item => {
    tree2list(item, list);
  });
};

export function getChildNodeId(parent, idList) {
  if (!parent) return;
  idList.push(parent.Id);
  const Children = parent.Children || [];
  for (let i = 0; i < Children.length; i++) {
    getChildNodeId(Children[i], idList);
  }
}
