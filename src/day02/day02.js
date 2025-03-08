import {
  compose,
  countBy,
  nth,
  path,
  replace,
  sortBy,
  split,
  toPairs,
} from 'ramda';
import { read } from '../../lib/read.js';

const data = read(`${import.meta.dirname}/input.txt`);
const prepare = split('\n');

const solve = compose(
  replace('.000Z', '+00:00'),
  path([-1, 0]),
  sortBy(nth(1)),
  toPairs,
  countBy(date => new Date(date).toISOString()),
  prepare,
);

console.log('solve', solve(data));
