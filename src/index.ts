import * as _ from 'lodash';
import { createBoard, printBoard, initializeBoard, cubes } from './board';
import { findWords, buildTrie } from './trie';
import * as fs from 'fs';
import { scoreResults } from './boggle';

const n = 4;
let board = createBoard(n, n);
board = initializeBoard(false, cubes, board);

const words = fs.readFileSync('words.txt', 'utf8').split('\n');
const trie = buildTrie(words);
const results = findWords(trie, board);
const score = scoreResults(results);

console.log(printBoard(board));
console.log(`Score: ${score}`);
console.log(`${results.join(' ')}`); 