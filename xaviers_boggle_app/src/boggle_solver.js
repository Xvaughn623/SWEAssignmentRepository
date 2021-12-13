// Xavier Vaughn
// @02928026
/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */


export const findAllSolutions = function (grid, dictionary) {

    let solutions = [];

    if (grid == null || dictionary == null) {
        return solutions;
    }

    let N = grid.length;
    for (let i = 0; i < N; i++) {
        if (grid[i].length !== N) {
            return solutions;
        }
    }

    convertCaseToLower(grid, dictionary);

    //let sortedDict = sortDict(dictionary);

    if (!isGridValid(grid)) {
        return solutions;
    }

    let solutionSet = new Set();

    var hash = createHashMap(dictionary);

    for (let gridY = 0; gridY < N; gridY++) {
        for (let gridX = 0; gridX < N; gridX++) {
            let word = "";
            let visited = new Array(N).fill(false).map(() => new Array(N).fill(false));

            parseThroughGrid(grid, gridY, gridX, visited, hash, solutionSet, word);
        }
    }
    solutions = Array.from(solutionSet);
    return solutions;
}

const isPrefixOrWord = (word, hash) => {
    return hash[word] !== undefined;
}

const isWord = (word, hash) => {
    return hash[word] === 1;
}

const createHashMap = (sortedDict) => {
    var dict = {};
    for (let i = 0; i < sortedDict.length; i++) {
        dict[sortedDict[i]] = 1;
        let wordlength = sortedDict[i].length;
        var str = sortedDict[i];
        for (let j = wordlength; wordlength > 1; wordlength--) {
            str = str.substr(0, j - 1);
            if (str in dict) {
                if (str === 1) {
                    dict[str] = 1;
                }
            }
            else {
                dict[str] = 0;
            }
        }
    }
    return dict;
}

//Converts any capital letters into lowercase letters
const convertCaseToLower = (grid, dictionary) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = grid[i][j].toLowerCase();
        }

        for (let i = 0; i < dictionary.length; i++) {
            dictionary[i] = dictionary[i].toLowerCase();
        }
    }
}

// Checks to see if the grid is valid or not
const isGridValid = (grid) => {
    let regex = /(st|qu)|[a-prt-z]/;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!grid[i][j].match(regex)) {
                return false;
            }
        }
    }
    return true;
}

// looks through the boggle board and finds words 
const parseThroughGrid = (grid, gridY, gridX, visited, hash, solutionSet, word) => {

    let adjMatrix = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    if (gridY < 0 || gridX < 0 || gridY >= grid.length || gridX >= grid.length || visited[gridY][gridX] === true) {
        return;
    }

    word += grid[gridY][gridX];


    if (isPrefixOrWord(word, hash)) {

        visited[gridY][gridX] = true;

        if (isWord(word, hash)) {
            if (word.length >= 3) {
                solutionSet.add(word);
            }
        }

        for (let i = 0; i < 8; i++) {
            parseThroughGrid(grid, gridY + adjMatrix[i][0], gridX + adjMatrix[i][1], visited, hash, solutionSet, word);
        }
    }
    //else{
    visited[gridY][gridX] = false;
    // }

    //return solutionSet;
}

export default findAllSolutions;
// Sources referenced:
// https://sebhastian.com/merge-sort-javascript/
// Professor Burge