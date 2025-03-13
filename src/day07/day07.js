import { compose, map, split } from 'ramda';
import { read } from '../../lib/read.js';
import { DateTime } from 'luxon';

const data = read(`${import.meta.dirname}/input.txt`);

const determineTimeZone = date =>
  date.setZone('America/Halifax').offset === date.offset
    ? 'America/Halifax'
    : 'America/Santiago';

const prepare = compose(map(split('\t')), split('\n'));

const solve = compose(
  list =>
    list.reduce((acc, [timestamp, correctMinutes, incorrectMinutes], index) => {
      const date = DateTime.fromISO(timestamp, { setZone: true });
      const timezone = determineTimeZone(date);
      const correctedDate = date
        .setZone(timezone)
        .plus({ minutes: correctMinutes - incorrectMinutes });

      return acc + correctedDate.hour * (index + 1);
    }, 0),
  prepare,
);

console.log('solve', solve(data));
