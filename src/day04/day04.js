import { compose, map, reduce, replace, slice, split } from 'ramda';
import { DateTime, Interval } from 'luxon';
import { read } from '../../lib/read.js';

const data = read(`${import.meta.dirname}/input.txt`);
const prepare = compose(
  map(
    compose(
      map(compose(replace(/\s+/, ' '), slice(11, Infinity))),
      split('\n'),
    ),
  ),
  split('\n\n'),
);

const dateWithTimeZone = date =>
  DateTime.fromFormat(date, 'z MMM dd, yyyy, HH:mm');

const solve = compose(
  reduce(
    (acc, [from, to]) =>
      acc +
      Interval.fromDateTimes(
        dateWithTimeZone(from),
        dateWithTimeZone(to),
      ).length('minutes'),
    0,
  ),
  prepare,
);

console.log('solve', solve(data));
