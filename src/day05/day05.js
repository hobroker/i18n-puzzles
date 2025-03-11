import { compose, map, split } from 'ramda';
import { read } from '../../lib/read.js';

const data = read(`${import.meta.dirname}/input.txt`);
const prepare = compose(
  map(row => [...row]),
  split('\n'),
);

const directions = [
  [1, 0],
  [0, 1],
  [0, 1],
];

const solve = compose(matrix => {
  const position = [0, 0];
  let poo = 0;
  while (matrix[position[0]]) {
    for (const direction of directions) {
      position[0] += direction[0];
      position[1] += direction[1];
      if (position[1] > matrix[0].length - 1) {
        position[1] = 0;
      }
    }
    if (matrix[position[0]]?.[position[1]] === '💩') {
      poo++;
    }
  }
  return poo;
}, prepare);

console.log('solve', solve(data));
