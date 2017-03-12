var grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    backward = false,
    z = 1;


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
            if (backward) {
                z = 1;
                backward = false;
            };
            var iArr = invalidGrid[row][col];
            iArr.push(value)
            col++;
            supplyGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            solveSudoku(grid, row, col);
        } else {
            supplyGrid.splice(index, 1);
            //console.log(supplyGrid);
            if (supplyGrid.length < 1) {
                changePreviousValue(grid, row, col);
            }
            solveSudoku(grid, row, col);
        }
    } else { //row = 3, col = 5
        col++;
        solveSudoku(grid, row, col);
    }
    return this;
}

function changePreviousValue(grid, row, col) {
    col--;
    if (col < 0) {
        col = 8;
        row--;
    }
    backward = true;
    console.log(`Cofnałem się z pola GRID:[${row}][${col+1}] o ${z} do tyłu na pole GRID:[${row}][${col}]`);
    if (z > 1) {
        if (col > 7) { //row = 4, col = 8
            row++;
            col = -1
        }
        var iArr = invalidGrid[row][col + 1];
        iArr.splice(0, invalidGrid[row][col + 1].length);
    }
    z++;

    supplyGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < invalidGrid[row][col].length; i++) {
        supplyGrid.splice(supplyGrid.indexOf(invalidGrid[row][col][i]), 1)
    }
    grid[row][col] = 0;
    solveSudoku(grid, row, col);
}

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