var sudokuGame = (function () {
    var table = document.querySelectorAll('table tr td input');
    var _generateArray9x9 = function () {
        var randomArray = [9];
        for (var i = 0; i < 9; i++) {
            randomArray[i] = [];
            for (var j = 0; j < 9; j++) {
                randomArray[i][j] = Math.floor(Math.random() * 9) + 1;
            }
        }
        return randomArray;
    };

    var myGame = _generateArray9x9();
    var _newGame = function () {
        var k = 0;
        myGame = _generateArray9x9();
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++, k++) {
                table[k].value = myGame[i][j];
            }
        }
    }

    var _saveGame = function () {
        localStorage.setItem('gameStatus', JSON.stringify(myGame));
    };

    var _loadGame = function () {
        var k = 0,
            game = JSON.parse(localStorage.getItem('gameStatus'));
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++, k++) {
                table[k].value = game[i][j];
            }
        }

    }

    var _bindEvents = function () {
        document.querySelector('#newGame').addEventListener('click', _newGame, false);
        document.querySelector('#saveGame').addEventListener('click', _saveGame, false);
        document.querySelector('#loadGame').addEventListener('click', _loadGame, false);
    };

    var _init = function () {
        _bindEvents();
    };

    return {
        init: _init
    }
})();

sudokuGame.init();