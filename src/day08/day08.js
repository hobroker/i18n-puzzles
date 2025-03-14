import { compose, count, map, split } from 'ramda';
import { read } from '../../lib/read.js';

const data = read(`${import.meta.dirname}/input.txt`);
const prepare = split('\n');

const normalize = str =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const solve = compose(
  count(
    password =>
      password.length >= 4 &&
      password.length <= 12 &&
      /\d/.test(password) && // at least one digit
      /[aeiou]/.test(password) && // at least one vowel
      /[bcdfghjklmnpqrstvwxyz]/.test(password) && // at least one consonant
      new Set(password).size === password.length, // no repeated characters
  ),
  map(normalize),
  prepare,
);

console.log('solve', solve(data));
