import { compose, evolve, map, split, trim } from 'ramda';
import { read } from '../../lib/read.js';

const data = read(`${import.meta.dirname}/input.txt`);

const prepare = compose(
  evolve({
    0: split('\n'),
    1: compose(map(trim), split('\n')),
  }),
  split('\n\n'),
);

const fixEncoding = string =>
  new TextDecoder('utf-8').decode(
    new Uint8Array([...string].map(c => c.charCodeAt(0))),
  );

const solve = compose(
  ([words, crossword]) =>
    crossword.reduce((sum, line) => {
      const letterIndex = line.split('').findIndex(letter => letter !== '.');
      const index = words.findIndex(
        word =>
          word.length === line.length &&
          word.charAt(letterIndex) === line.charAt(letterIndex),
      );
      return sum + index + 1;
    }, 0),
  evolve({
    0: map(compose(fixEncoding, fixEncoding)),
  }),
  prepare,
);

console.log('solve', solve(data));
