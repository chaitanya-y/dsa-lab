


function groupAnagrams(anagrams) {
  const seen = new Map();

  for (const anagram of anagrams) {
    const sortedAnagram = anagram.split("").sort().join("");

    if (!seen.has(sortedAnagram)) {
      seen.set(sortedAnagram, []);
    }

    seen.get(sortedAnagram).push(anagram);
  }

  return Array.from(seen.values());
}

console.log("Group Anagram result is",groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))