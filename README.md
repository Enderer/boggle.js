# Boggle Solver
Solution for solving the game Boggle.

```javascript
// Create the gameboard
const n = 4;
let board = createBoard(n, n);
board = initializeBoard(false, cubes, board);

// Search for words
const words = fs.readFileSync('words.txt', 'utf8').split('\n');
const trie = buildTrie(words);
const results = findWords(trie, board);
const score = scoreResults(results);

console.log(printBoard(board));
console.log(`Score: ${score}`);
console.log(`${results.join('  ')}`); 
//  e  p  t  e
//  e  t  f  a
//  r  g  l  v
//  e  d  i  q
//  
//  Score: 113
//  aft after alder alt alter altered ate avid degree dig dilate diva eat edge 
//  egret ere erg eta etal falter faltered fat fate fatter feat fetal fetter 
//  fettered flat flatter flattered get gilt glide glider greet late latter lid
//  peer peered peg per pert pet peter petered red rep tea teal tee tree valid vat
```

Generate and search a Boggle board of any size.

```javascript
const n = 10;
let board = createBoard(n, n);
board = initializeBoard(true, cubes, board);
...
//  a  k  a  o  e  n  r  z  n  d
//  a  o  n  u  p  i  i  l  o  p
//  h  s  n  c  e  a  a  h  r  d
//  o  a  h  r  j  i  e  e  d  d
//  c  e  o  t  o  o  a  o  e  f
//  c  e  t  d  o  e  z  r  m  e
//  i  r  o  w  e  i  a  r  c  r
//  i  e  n  s  g  e  t  r  u  o
//  n  f  n  t  f  o  y  l  l  t
//  e  t  t  l  o  o  e  a  a  i
//  
//  Score: 895
//  ace acetone aha ail air airier airline ala ale aline all allay alley allot
//  allure ally alt altar alto anchor anna anon ape arc are arm armed art arty
//  ash ashore ate atoll aupair aye can cancer canon canons cans cash chaos 
//  cheerchore chorea col cola colt cor core cot court courtly crate craze ...
```
