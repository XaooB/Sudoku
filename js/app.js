var sudokuGame = (function () {
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
        grid2 = [] //copy of grid
        newGameStatus = false,
        amoutToDelete = 0;

    var addGame = function () {
        var htmlGrid = document.querySelectorAll('table tr td input'),
            c = 0;

        for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++, c++)
                if (Number(htmlGrid[c].value) !== 0)
                    grid[i][j] = Number(htmlGrid[c].value);
        bindKeyPress(htmlGrid);
    }

    var newGame = function () {
        var n = 0,
            htmlGrid = document.querySelectorAll('table tr td input'),
            level = Number(document.querySelector('#lev').value);
        newGameStatus = true;

        bindKeyPress(htmlGrid);
        solveSudoku(grid, 0, 0)

        switch (level) {
        case 1:
            amoutToDelete = 16
            break;
        case 2:
            amoutToDelete = 27
            break;
        case 3:
            amoutToDelete = 34
            break;
        case 4:
            amoutToDelete = 40
            break;
        case 5:
            amoutToDelete = 55
            break;
        case 6:
            amoutToDelete = 70
            break;
        default:
            amoutToDelete = 0
            break;
        }

        while (n < amoutToDelete) {
            var row = randomNumber();
            col = randomNumber();

            if (grid[row][col] != 0) {
                grid[row][col] = 0;
            } else {
                while (grid[row][col] == 0) {
                    row = randomNumber();
                    col = randomNumber();
                }
                grid[row][col] = 0;
            }
            n++;
        }
        newGameStatus = false;
        fillTheDom(grid);
    }

    var randomNumber = function () {
        return Math.floor(Math.random() * 9);
    }

    var exportGame = function () {
        var exportGrid = document.querySelector('#download');

        html2canvas(document.querySelector('table'), {
            onrendered: function (canvas) {
                exportGrid.setAttribute('href', canvas.toDataURL('image/png'));
                exportGrid.setAttribute('download', 'Board.png');
            }
        });
    };

    var keyPressed = function (e) {
        grid2 = grid.slice();
        var str = this.getAttribute('id'),
            row = Number(str.slice(0, 1)),
            col = Number(str.slice(1, 2)),
            value = Number(e.key);

        if (solveAfterKeyPress(grid2, row, col, value, str)) {
            e.target.parentNode.style.backgroundColor = '';
            grid[row][col] = value;
            return true;
        } else {
            e.target.parentNode.style.backgroundColor = 'rgba(206,12,67,.8)';
            grid[row][col] = 0;
            return false;
        }
    }

    var solveAfterKeyPress = function (grid2, row, col, value, str) {
        var field = findUnassignedLocation(grid2, row, col),
            row1 = Number(str.slice(0, 1)),
            col1 = Number(str.slice(1, 2));
        row = field[0]; //2
        col = field[1]; //3

        if (row === -1) {
            //fillTheDom(grid);
            return true;
        }

        if ((col == col1) && (row == row1)) {
            if (isValid(grid2, row, col, value)) {
                grid2[row][col] = value;
                if (solveAfterKeyPress(grid2, row, col, value, str)) {
                    return true;
                }
                grid2[row][col] = 0;
            }
        } else {
            for (var num = 1; num <= 9; num++) {
                if (isValid(grid2, row, col, num)) {
                    grid2[row][col] = num;
                    if (solveAfterKeyPress(grid2, row, col, value, str)) {
                        return true;
                    }
                    grid2[row][col] = 0;
                }
            }
        }
        return false;
    }

    var saveGame = function () {
        localStorage.setItem('grid', JSON.stringify(grid));
    }

    var loadGame = function () {
        var htmlGrid = document.querySelectorAll('table tr td input'),
            c = 0;

        grid = JSON.parse(localStorage.getItem('grid'));
        for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++, c++)
                if (grid[i][j] !== 0)
                    htmlGrid[c].value = grid[i][j];
        bindKeyPress(htmlGrid);
    }

    var fillTheDom = function (grid) {
        var htmlGrid = document.querySelectorAll('table tr td input'),
            c = 0;
        for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++, c++) {
                if (grid[i][j] !== 0) htmlGrid[c].value = grid[i][j];
            }
    }

    var solver = function () {
        solveSudoku(grid, 0, 0);
    }

    var solveSudoku = function (grid, row, col) {
        var field = findUnassignedLocation(grid, row, col);
        row = field[0]; //2
        col = field[1]; //3
        if (row === -1) {
            if (!newGameStatus) fillTheDom(grid);
            return true;
        }

        for (var num = 1; num <= 9; num++) {
            if (newGameStatus) {
                num = Math.floor(Math.random() * 9) + 1;
            }
            if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (solveSudoku(grid, row, col)) {
                    return true;
                }
                grid[row][col] = 0;
            }
        }
        return false;
    }

    var findUnassignedLocation = function (grid, row, col) {
        var foundZero = false;
        var location = [-1, -1];

        while (!foundZero) {
            if (row === 9) {
                foundZero = true;
            } else {
                if (grid[row][col] === 0) {
                    location[0] = row;
                    location[1] = col;
                    foundZero = true;
                } else {
                    if (col < 8) {
                        col++;
                    } else {
                        row++;
                        col = 0;
                    }
                }
            }
        }
        return location;
    }

    var isValid = function (grid, row, col, num) {
        return validateRow(grid, row, num) && validateCol(grid, col, num) && validateBox(grid, row, col, num);
    }

    var validateRow = function (grid, row, num) {
        for (var col = 0; col < 9; col++)
            if (grid[row][col] === num)
                return false;
        return true;
    }

    var validateCol = function (grid, col, num) {
        for (var row = 0; row < 9; row++)
            if (grid[row][col] === num)
                return false;
        return true;
    }

    var validateBox = function (grid, row, col, num) {
        row = Math.floor(row / 3) * 3;
        col = Math.floor(col / 3) * 3;
        for (var r = 0; r < 3; r++)
            for (var c = 0; c < 3; c++)
                if (grid[row + r][col + c] === num)
                    return false;
        return true;
    }

    var bindKeyPress = function (htmlGrid) {
        for (var i = 0; i < 80; i++)
            htmlGrid[i].addEventListener('keypress', keyPressed, false);
    }

    var _bindEvents = function () {
        document.querySelector('#newGame').addEventListener('click', newGame, false);
        document.querySelector('#saveGame').addEventListener('click', saveGame, false);
        document.querySelector('#loadGame').addEventListener('click', loadGame, false);
        document.querySelector('#addGame').addEventListener('click', addGame, false);
        document.querySelector('#solveGame').addEventListener('click', solver, false);
        document.querySelector('#exportGame').addEventListener('click', exportGame, false);
    };

    var init = function () {
        _bindEvents();
    }

    return {
        init: init
    }
}());

sudokuGame.init();
