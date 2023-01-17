/**
 * Implementation taken from https://www.geeksforgeeks.org/jaro-and-jaro-winkler-similarity/
 *
 * Don't blame me for all the `var` declarations
 *
 * */

export default function jaro_similarity(s1: string, s2: string) {
  // If the strings are equal
  if (s1 == s2) return 1.0;

  // Length of two strings
  var len1 = s1.length,
    len2 = s2.length;

  // Maximum distance upto which matching
  // is allowed
  var max_dist = Math.floor(Math.max(len1, len2) / 2) - 1;

  // Count of matches
  var match = 0;

  // Hash for matches
  var hash_s1 = Array(s1.length).fill(0);
  var hash_s2 = Array(s1.length).fill(0);

  // Traverse through the first string
  for (var i = 0; i < len1; i++) {
    // Check if there is any matches
    for (var j = Math.max(0, i - max_dist); j < Math.min(len2, i + max_dist + 1); j++)
      // If there is a match
      if (s1[i] == s2[j] && hash_s2[j] == 0) {
        hash_s1[i] = 1;
        hash_s2[j] = 1;
        match++;
        break;
      }
  }

  // If there is no match
  if (match == 0) return 0.0;

  // Number of transpositions
  var t = 0;

  var point = 0;

  // Count number of occurrences
  // where two characters match but
  // there is a third matched character
  // in between the indices
  for (var i = 0; i < len1; i++)
    if (hash_s1[i]) {
      // Find the next matched character
      // in second string
      while (hash_s2[point] == 0) point++;

      if (s1[i] != s2[point++]) t++;
    }

  t /= 2;

  // Return the Jaro Similarity
  return (match / len1 + match / len2 + (match - t) / match) / 3.0;
}
