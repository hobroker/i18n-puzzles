import { compose, count, split } from 'ramda';
import { read } from '../../lib/read.js';

const data = read(`${import.meta.dirname}/input.txt`);
const prepare = split('\n');

const solve = compose(
  count(
    password =>
      password.length >= 4 &&
      password.length <= 12 &&
      /\d/.test(password) && // at least one digit
      /\p{Ll}/u.test(password) && // lowercase letter including unicode
      /\p{Lu}/u.test(password) && // uppercase letter including unicode
      /[^\x\00-\x7F]/.test(password), // outside of ASCII
  ),
  prepare,
);

console.log('solve', solve(data));
