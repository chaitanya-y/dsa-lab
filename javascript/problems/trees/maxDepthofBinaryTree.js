function maxDepth(){


    if(root == null){
        return 0
    }

    let leftDepth = maxDepth(root.left)
    let rightDepth = maxDepth(root.right)

    return 1 + Math.max(leftDepth,rightDepth)
}


// Iterative BFS solution

// This is a nice alternative if they ask for non-recursive.

// Idea:

// use queue

// process level by level

// each level increases depth by 1

function maxDepth(root) {
  if (root === null) {
    return 0;
  }

  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    depth++;
  }

  return depth;
}
// How to explain BFS version

// I use level-order traversal. Each pass through the queue processes one tree level, so I increment depth once per level.