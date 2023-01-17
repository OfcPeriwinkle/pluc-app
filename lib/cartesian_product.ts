/**
 * Adapted from https://gist.github.com/cybercase/db7dde901d7070c98c48
 * @param arrays
 * @returns
 */

// export default function product() {
//   var args = Array.prototype.slice.call(arguments); // makes array from arguments
//   return args.reduce(
//     function tl(accumulator, value) {
//       var tmp = [];
//       accumulator.forEach(function (a0) {
//         value.forEach(function (a1) {
//           tmp.push(a0.concat(a1));
//         });
//       });
//       return tmp;
//     },
//     [[]]
//   );
// }

export default function arrayProduct(...arrays) {
  return arrays.reduce(
    (prevAccumulator, currentArray) => {
      let newAccumulator = [];
      prevAccumulator.forEach((prevAccumulatorArray) => {
        currentArray.forEach((currentValue) => {
          newAccumulator.push(prevAccumulatorArray.concat(currentValue));
        });
      });
      return newAccumulator;
    },
    [[]]
  );
}
