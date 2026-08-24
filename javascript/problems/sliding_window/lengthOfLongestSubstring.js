




console.log("----lengthOfLongestSubstring_bruteforce method")
function lengthOfLongestSubstring_bruteforce(s) {
  let best = 0;

  for (let i = 0; i < s.length; i++) {
    const seen = new Set();

    for (let j = i; j < s.length; j++) {
      const ch = s[j];

      if (seen.has(ch)) break;     // duplicate found, stop this substring
      seen.add(ch);

      best = Math.max(best, j - i + 1);
    }
  }

  return best;
}