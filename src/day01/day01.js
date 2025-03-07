import { compose, converge, length, map, split, sum } from 'ramda';
import { read } from '../../lib/read.js';

const data = read(`${import.meta.dirname}/input.txt`);
const prepare = compose(split('\n'));

const messageBytes = message => {
  const textEncoder = new TextEncoder();
  return textEncoder.encode(message).length;
};

const solve = compose(
  sum,
  map(
    converge(
      (bytes, size) => {
        const validSMS = bytes <= 160;
        const validTweet = size <= 140;
        return validSMS ? (validTweet ? 13 : 11) : validTweet ? 7 : 0;
      },
      [messageBytes, length],
    ),
  ),
  prepare,
);

console.log('solve', solve(data));
