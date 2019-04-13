import * as _ from 'lodash';

export interface Cell { c: number, r: number, char: string, visited: boolean };
export interface Board extends Array<Cell> {};
export interface Cube extends Array<string> {};
const cos45 = Math.cos(Math.PI / 4);
const sin45 = Math.sin(Math.PI / 4);

/**
 * Get all the strings that can be searched on a board
 * This includes all the rows, columns, and diagonals
 */
export const getDocs: {(b: Board): string[]} = (board) => {
    // Get the strings for the rows and columns then
    // rotate the board 45 degress to get the diagonal strings
    const cols = _(board).groupBy('c').values().orderBy('r').value();
    const rows = _(board).groupBy('r').values().orderBy('c').value();
    const diag = board.map(rotateCell);
    const dCols = _(diag).groupBy('r').values().orderBy('r').value();
    const dRows = _(diag).groupBy('y').values().orderBy('c').value();

    // Reverse the strings to search backward and forward
    // then concat all the strings into a single list
    const docs = [
        ...rows, 
        ...cols, 
        ...dRows, 
        ...dCols,
        ..._.reverse(rows),
        ..._.reverse(cols),
        ..._.reverse(dRows),
        ..._.reverse(dCols)
    ];
    return docs.map(d => d.join(''));
};

/**
 * Rotate a cell 45 degrees
 * @param c Cell to be rotated
 */
export const rotateCell = (cell: Cell): Cell => ({ 
    ...cell, 
    c: cell.c * sin45 + cell.r * sin45, 
    r: cell.c * -sin45 + cell.r * cos45 
});

/**
 * Create an empty board with the given number of rows and cols
 */
export const createBoard = (cols: number, rows: number): Board => {
    const board: Board = [];
    for(let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            board.push({ c, r, char: ' ', visited: false });
        }
    }
    return board;
}

/**
 * Set the board to a random pattern of letters
 * A random cube falls into a random cell on a random side
 */
export const initializeBoard = (reuse: boolean, cubeParam: Cube[], boardParam: Board): Board => {
    let cubes = [...cubeParam];
    const cells = [...boardParam];
    while(cubes.length > 0 && cells.length > 0) {
        const indexCube = Math.floor(Math.random() * cubes.length);
        const indexCell = Math.floor(Math.random() * cells.length);
        const cube = cubes.splice(indexCube, 1)[0];
        const cell = cells.splice(indexCell, 1)[0];

        const indexSide = Math.floor(Math.random() * cube.length);
        const side = cube[indexSide];
        cell.char = side;

        // There are more squares than cubes
        if (reuse && cubes.length === 0) {
            cubes = [...cubeParam];
        }
    }
    return boardParam;
};

export const getConnected = (board: Board, cell: Cell): Cell[] => {
    const connected = board.filter(b => {
        return Math.abs(b.c - cell.c) < 2 && 
            Math.abs(b.r - cell.r) < 2 &&
            b.visited !== true &&
            b !== cell
    });
    return connected;
};

export const printBoard = (board: Board): string => {
    const cols = _(board)
        .groupBy('c')
        .values()
        .orderBy('r')
        .map(cells => cells.map(c => c.char).join(' '))
        .value();
    const stringVal = cols.join('\n');
    return stringVal;
}

export const cubes: Cube[] = [	
    ['a', 'a', 'a', 'f', 'r', 's'],
	['a', 'a', 'e', 'e', 'e', 'e'],
	['a', 'a', 'f', 'i', 'r', 's'],
	['a', 'd', 'e', 'n', 'n', 'n'],
	['a', 'e', 'e', 'e', 'e', 'm'],

	['a', 'e', 'e', 'g', 'm', 'u'],
	['a', 'e', 'g', 'm', 'n', 'n'],
	['a', 'f', 'i', 'r', 's', 'y'],
	['b', 'j', 'k', 'q', 'x', 'z'],
	['c', 'c', 'e', 'n', 's', 't'],

	['c', 'e', 'i', 'i', 'l', 't'],
	['c', 'e', 'i', 'l', 'p', 't'],
	['c', 'e', 'i', 'p', 's', 't'],
	['d', 'd', 'h', 'n', 'o', 't'],
	['d', 'h', 'h', 'l', 'o', 'r'],

	['d', 'h', 'l', 'n', 'o', 'r'],
	['d', 'h', 'l', 'n', 'o', 'r'],
	['e', 'i', 'i', 'i', 't', 't'],
	['e', 'm', 'o', 't', 't', 't'],
	['e', 'n', 's', 's', 's', 'u'],

	['f', 'i', 'p', 'r', 's', 'y'],
	['g', 'o', 'r', 'r', 'v', 'w'],
	['i', 'p', 'r', 'r', 'r', 'y'],
	['n', 'o', 'o', 't', 'u', 'w'],
	['o', 'o', 'o', 't', 't', 'u'],
]