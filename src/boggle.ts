import * as _ from 'lodash';

// Points scored for words with he given length
const wordValues = {
    3: 1,
    4: 1,
    5: 2,
    6: 3,
    7: 5
};

/**
 * Calculates the score for the game
 * @param words List of words found 
 */
export const scoreResults = (words: string[]): number => {
    const scores = words.map(w => {
        return w.length > 7 ? 8 : wordValues[w.length] || 0;
    });
    return _.sum(scores);
}
