var grid = [
    [0, 3, 1, 2, 0, 5,8, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0],
    [6, 0, 0, 4, 0, 3, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 9, 0, 0],
    [8, 0, 7, 5, 0, 1, 3, 0, 6],
    [0, 0, 2, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 7, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 1, 0, 0, 2, 4, 9, 0]
],
    invalidGrid = [
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []]
    ],
    supplyGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    row = 0,
    col = 0,
    value = 0,
    index = 0,
    z = 0;


var solveSudoku = function (grid, row, col) {
    if (row > 7 && col > 8) return;
    if (col > 8) {
        row++;
        col = 0;
    }
    if (grid[row][col] === 0) {
        index = Math.floor(Math.random() * supplyGrid.length);
        value = supplyGrid[index];
        if (isValid(row, col, value)) {
            grid[row][col] = value;
            var costam = invalidGrid[row][col];
            costam.push(value)
            col++;
            supplyGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            solveSudoku(grid, row, col);
        } else {
            supplyGrid.splice(index, 1);
            //console.log(supplyGrid);
            if (supplyGrid.length < 1) { //teoretyczny backtracking
                col--;
                if (col < 0) col = 8;
                supplyGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                for (var i = 0; i < invalidGrid[row][col].length; i++) {
                    supplyGrid.splice(supplyGrid.indexOf(invalidGrid[row][col][i]), 1)
                }
                grid[row][col] = 0;
                solveSudoku(grid, row, col);
            }
            solveSudoku(grid, row, col);
        }
    } else { //row = 3, col = 5
        col++;
        solveSudoku(grid, row, col);
    }
    return this;
}


//function solveSudoku() {
//    var value, id = 0;
//    for (i = 0; i < 9; i++) {
//        for (j = 0; j < 9; j++) { //[0][0] = 1 [0][1] = ?
//            console.log(`i = ${i}, j = ${j}`);
//            console.log(`GRID: ${grid[i][j]}`);
//            if (grid[i][j] === undefined) {
//                if (id > 8) id = 0;
//                value = supplyGrid[id];
//                id++;
//                if ((validateRow(i, j, value)) && (validateColumn(i, j, value)) === true) {
//                    grid[i][j] = value;
//                } else {
//                    value = supplyGrid[id++];
//                    grid[i][j] = value;
//                    //                    console.log(`TO JEST GRID WEWNĄTRZ ELSA ${grid[i][j]}`);
//                }
//            }
//            console.log('--------------------');
//        }
//        id = 0;
//    }
//    console.log(grid);
//}

function displaySudoku() {
    var string = '';
    for (var i = 0; i < 9; i++) {
        string += '<tr>';
        for (var j = 0; j < 9; j++) {
            string += '<td>';
            string += `${grid[i][j]}`;
            string += '</td>';
        }
        string += '</tr>';
    }
    document.write('<table>' + string + '</table>')
}

function isValid(row, col, value) {
    if ((validateColumn(row, col, value)) || (validateRow(row, col, value)) || (validateBox(row, col, value))) {
        return false;
    } else {
        return true;
    }
}

function validateBox(row, col, value) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;
    var isFound = false;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (grid[row + i][col + j] == value) isFound = true;
        }
    }
    return isFound;
}

function validateRow(row, col, value) {
    var isFound = false;
    for (var i = 0; i < 9; i++) {
        if (grid[row][i] === value) isFound = true;
    }
    return isFound;
}

function validateColumn(row, col, value) {
    var isFound = false;
    for (var i = 0; i < 9; i++) {
        if (grid[i][col] === value) isFound = true;
    }
    return isFound;
}