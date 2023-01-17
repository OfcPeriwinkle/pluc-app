/**
 * Implementation adapted from https://stackoverflow.com/questions/45813439/itertools-combinations-in-javascript
 *
 */

export default function getCombinations<T>(array: Array<T>, size: number) {
  // TODO: figure out what homeboy meant by t and i
  function p(t, i) {
    if (t.length === size) {
      result.push(t);
      return;
    }
    if (i + 1 > array.length) {
      return;
    }
    p(t.concat(array[i]), i + 1);
    p(t, i + 1);
  }

  var result = [];
  p([], 0);
  return result;
}
