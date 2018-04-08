'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  // Add a Board Constructor
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // Add a playerBoard Getter Method


  _createClass(Board, [{
    key: 'flipTile',


    // Allows the user to flip a tile
    value: function flipTile(rowIndex, columnIndex) {
      // The tile is not empty
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This title has already been flipped!');
        return;
      }
      // There is a bomb at that tile
      else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
          this._playerBoard[rowIndex][columnIndex] = 'B';
        }
        // Flip the tile and display the number of neighboring bombs on that same tile
        else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
          }
      this._numberOfEmptySpaces--;
    }

    // Display the number of bombs adjacenet to the flipped tile

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;

      var numberOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }

    // Check for Safe Tiles

  }, {
    key: 'hasNonBombEmptySpaces',
    value: function hasNonBombEmptySpaces() {
      return this._numberOfEmptySpaces !== this._numberOfBombs;
    }

    // print() Function

  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }

    // Dynamically Generate a Player Board

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];

      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];
        for (var columns = 0; columns < numberOfColumns; columns++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }

    // Dynamically Generate a Bomb Board

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];

      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];
        for (var columns = 0; columns < numberOfColumns; columns++) {
          row.push(null);
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();