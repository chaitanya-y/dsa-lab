// Subtree of Another Tree
// Check whether subRoot matches a node in root in both values and shape.
// Complexity variables: n = root node count; m = subRoot node count.
//
// How to test:
// Test file: tests/javascript/subtreeOfAnotherTree.test.js
// Run: node --test tests/javascript/subtreeOfAnotherTree.test.js

/** Compare two trees at matching positions, including their shapes. */
function sameTree(first, second) {
  if (first === null && second === null) return true; // Two empty positions match.
  if (first === null || second === null) return false; // Only one node means different shapes.
  if (first.val !== second.val) return false; // Corresponding nodes need equal values.

  return sameTree(first.left, second.left) && sameTree(first.right, second.right); // Both child pairs must match.
}

/**
 * Simple DFS: test every node in root as a possible start of the subtree.
 * How we solve it: handle empty roots, compare this pair with Same Tree, then
 * search the left and right branches if this position is not a match.
 * Complexity: O(n * m) worst-case time and O(h) recursive call space.
 */
function isSubtreeDFS(root, subRoot) {
  if (subRoot === null) return true; // An empty tree is a subtree of any tree.
  if (root === null) return false; // A non-empty tree cannot fit inside an empty tree.
  if (sameTree(root, subRoot)) return true; // Check whether this node starts an exact match.

  return isSubtreeDFS(root.left, subRoot) || isSubtreeDFS(root.right, subRoot); // Try both remaining branches.
}

/**
 * Serialize a tree in preorder and write null markers for every empty child.
 * The markers make the tokens describe the tree's shape as well as its values.
 */
function serializePreorder(root) {
  const tokens = []; // Store values and null markers in preorder order.
  const pending = [root]; // A stack allows preorder traversal without recursive calls.

  while (pending.length > 0) { // Keep processing until every position is recorded.
    const node = pending.pop(); // Read the next node or empty-child position.
    if (node === null) { // Empty-child positions are part of the structure.
      tokens.push(null); // Use null as a marker distinct from integer values.
      continue; // Empty positions do not have children to visit.
    }

    tokens.push(node.val); // Record this node before its children.
    pending.push(node.right); // Push right first so it is processed after left.
    pending.push(node.left); // Preorder visits the left child before the right.
  }

  return tokens; // Return a unique sequence for the tree's values and shape.
}

/**
 * Intermediate: compare every possible serialized token window directly.
 * Complexity: O(n * m) worst-case time and O(n + m) extra space.
 */
function isSubtreeSerializedBruteForce(root, subRoot) {
  if (subRoot === null) return true; // An empty candidate is always contained.
  if (root === null) return false; // A non-empty candidate cannot fit in an empty tree.

  const rootTokens = serializePreorder(root); // Encode the larger tree.
  const subTokens = serializePreorder(subRoot); // Encode the candidate with the same markers.
  const lastStart = rootTokens.length - subTokens.length; // Later starts cannot fit the whole candidate.

  for (let start = 0; start <= lastStart; start += 1) { // Try every start that can fit all tokens.
    let matches = true; // Assume this position matches until a token differs.
    for (let offset = 0; offset < subTokens.length; offset += 1) { // Compare candidate tokens in order.
      if (rootTokens[start + offset] !== subTokens[offset]) { // Check a value or empty-child marker.
        matches = false; // This start does not contain the full candidate.
        break; // Stop checking a position as soon as it differs.
      }
    }
    if (matches) return true; // All tokens matched, so the candidate is a subtree.
  }

  return false; // No starting position contained the complete candidate sequence.
}

/** Build the longest-prefix/suffix lengths used by KMP. */
function buildLPS(pattern) {
  const lps = Array(pattern.length).fill(0); // lps[i] records a reusable prefix through i.
  let prefixLength = 0; // Track the current prefix that also matches a suffix.
  let index = 1; // The first token has no earlier prefix to compare.

  while (index < pattern.length) { // Fill each remaining prefix-table position.
    if (pattern[index] === pattern[prefixLength]) { // Extend the current matching prefix.
      prefixLength += 1; // Include this shared token in the prefix.
      lps[index] = prefixLength; // Save the length to reuse after a mismatch.
      index += 1; // Continue to the next pattern token.
    } else if (prefixLength > 0) { // A shorter prefix might still match.
      prefixLength = lps[prefixLength - 1]; // Fall back without moving index.
    } else { // No prefix can be reused here.
      lps[index] = 0; // The next comparison must restart from pattern start.
      index += 1; // Continue building the table.
    }
  }

  return lps; // Return the table KMP needs to avoid rescanning matched tokens.
}

/** Search token arrays in linear time by reusing KMP's matching prefix. */
function containsTokensKMP(text, pattern) {
  const lps = buildLPS(pattern); // Prepare the pattern's fallback table once.
  let textIndex = 0; // Track the next token in the larger tree's serialization.
  let patternIndex = 0; // Track how many candidate tokens currently match.

  while (textIndex < text.length) { // KMP never moves textIndex backward.
    if (text[textIndex] === pattern[patternIndex]) { // These tokens extend the current match.
      textIndex += 1; // Advance through the root serialization.
      patternIndex += 1; // Advance through the candidate serialization.
      if (patternIndex === pattern.length) return true; // The whole candidate was found.
    } else if (patternIndex > 0) { // Keep any prefix that can still match.
      patternIndex = lps[patternIndex - 1]; // Reuse the prefix table instead of restarting.
    } else { // No candidate token matched at this text position.
      textIndex += 1; // Try the next text token as a possible start.
    }
  }

  return false; // The full candidate token sequence did not appear.
}

/**
 * Optimized: serialize both trees and use KMP to search the token sequence.
 * Complexity: O(n + m) time and O(n + m) extra space.
 */
function isSubtreeKMP(root, subRoot) {
  if (subRoot === null) return true; // An empty tree is always contained.
  if (root === null) return false; // A non-empty tree cannot match an empty root.

  const rootTokens = serializePreorder(root); // Encode all root values and child positions.
  const subTokens = serializePreorder(subRoot); // Encode the candidate in the same format.
  return containsTokensKMP(rootTokens, subTokens); // Search in linear time with KMP.
}

// Keep the standard interview function name connected to the simpler DFS approach.
const isSubtree = isSubtreeDFS;

module.exports = {
  isSubtree,
  isSubtreeDFS,
  isSubtreeSerializedBruteForce,
  isSubtreeKMP,
};
