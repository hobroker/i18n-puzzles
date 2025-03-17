import { compose, map, reduce, split } from 'ramda';
import { read } from '../../lib/read.js';

const data = read(`${import.meta.dirname}/input.txt`);

const prepare = compose(map(split('')), split('\n'));

const upper = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
const lower = upper.toLowerCase();
const maxShifts = upper.length;
const searchVariants = [
  'Οδυσσευς',
  'Οδυσσεως',
  'Οδυσσει',
  'Οδυσσεα',
  'Οδυσσευ',
];

const hasOdysseus = string =>
  searchVariants.some(name => string.includes(name));

const shift = (chars, i) =>
  chars
    .map(char =>
      upper.includes(char)
        ? upper[(upper.indexOf(char) + i) % maxShifts]
        : lower.includes(char)
          ? lower[(lower.indexOf(char) + i) % maxShifts]
          : char,
    )
    .join('');

const solve = compose(
  reduce((acc, line) => {
    for (let i = 1; i < maxShifts; i++) {
      if (hasOdysseus(shift(line, i))) {
        return acc + i;
      }
    }
    return acc;
  }, 0),
  prepare,
);

console.log('solve', solve(data));
