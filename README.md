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

// r  r  l  e
// p  a  s  a
// n  r  t  s
// q  a  e  e

// Score: 304
// aerate aerates ala alas ale ales ana anal are area art arts ass assert asset aster astern
// asters astral ate ear earn ears ease east easter eastern eat eater eaters eats elan elate 
// elates els era eras erase erst est ester esters eta etal eternal lap las lase laser lasers 
// lass last lasts late later lea lease least leat less lessee lesser lest nap nasal natal pal
// palate palates pale pales palest pals pan par pare pares parse part parts pass passe passer 
// past pasta pastas paste pastes pasts pat pate pater pates pats prat pre preset presets
// press qatar qua quart quarts ran rap rare rarest raster rat rate rater rates rats resale 
// reset resets rest rests sale sales salsa san sap sat satan satrap sea seal sear sears seas 
// seat seats see seer seers set sets slap slat slate slater slates slats stale star stare 
// stares stars steer steers stern strap tale tales tan tap tar tares tarn tars tarsal tassel 
// tea tear tears tee tees tern terse trap tree trees tress
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
