import * as _ from 'lodash';
import { Board, Cell, getConnected } from "./board";

export class Node {
    value: string;
    char: string;
    parent: Node;
    children = new Map<string, Node>();
};


export const buildTrie = (strings: string[]): Node => {
    const root = new Node();
    for (const string of strings) {
        let node = root;
        for(const char of string) {
            const { children } = node;
            if (children[char] == null) {
                const newNode = new Node();
                newNode.parent = node;
                newNode.char = char;
                children[char] = newNode;
            }
            node = children[char];
        }
        node.value = string;
    }
    return root;
}

export const findWords = (root: Node, board: Board): string[] => {
    const words = _(board)
        .map(b => searchCell(board, root, b))
        .flatten()
        .filter(w => w.length > 2)
        .uniq()
        .sort()
        .value();
    return words;
}

export const searchCell = (board: Board, node: Node, cell: Cell): string[] => {
    if (node.children[cell.char] == null) {
        return [];
    }
    node = node.children[cell.char];
    cell.visited = true;
    const cellWords = node.value ? [node.value] : [];
    const children = getConnected(board, cell);
    const childWords = children.map(c => searchCell(board, node, c));
    const words = [...cellWords, ..._.flatten(childWords)];
    cell.visited = false;
    return words;
}
