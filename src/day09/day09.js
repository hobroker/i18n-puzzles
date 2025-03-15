import {
  compose,
  evolve,
  filter,
  join,
  map,
  mapObjIndexed,
  nth,
  sort,
  split,
  toPairs,
} from 'ramda';
import { read } from '../../lib/read.js';
import { DateTime } from 'luxon';

const data = read(`${import.meta.dirname}/input.txt`);

const prepare = compose(
  map(compose(evolve({ 1: split(', ') }), split(': '))),
  split('\n'),
);

const formats = ['dd-MM-yy', 'MM-dd-yy', 'yy-MM-dd', 'yy-dd-MM'];

const solve = compose(
  join(' '),
  sort((a, b) => a.localeCompare(b)),
  map(nth(0)),
  filter(([, dates]) =>
    dates?.some(date => date.equals(DateTime.fromISO('2001-09-11'))),
  ),
  toPairs,
  mapObjIndexed(timestamps => {
    const format = formats.find(format =>
      timestamps.every(
        timestamp => DateTime.fromFormat(timestamp, format).isValid,
      ),
    );
    return timestamps.map(timestamp => DateTime.fromFormat(timestamp, format));
  }),
  list => {
    const tree = {};
    for (const [timestamp, people] of list) {
      for (const person of people) {
        tree[person] ||= [];
        tree[person].push(timestamp);
      }
    }
    return tree;
  },
  prepare,
);

console.log('solve', solve(data));
