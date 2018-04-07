// Add Game class 
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
}


// Add a Board Constructor
class Board {

  constructor (numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // Add a playerBoard Getter Method
  get playerBoard() {
      return this._playerBoard;
  }

  // Allows the user to flip a tile
  flipTile (rowIndex, columnIndex) {
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
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
          neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  // Check for Safe Tiles
  hasNonBombEmptySpaces() {
    return this._numberOfEmptySpaces !== this._numberOfBombs;
  }

  // print() Function
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // Dynamically Generate a Player Board
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    const board = [];

    for (let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for (let columns = 0; columns < numberOfColumns; columns++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  // Dynamically Generate a Bomb Board
  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];

    for (let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for (let columns = 0; columns < numberOfColumns; columns++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
     while (numberOfBombsPlaced < numberOfBombs) {
       let randomRowIndex = Math.floor(Math.random() * numberOfRows);
       let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
       if (board[randomRowIndex][randomColumnIndex] !== 'B') {
         board[randomRowIndex][randomColumnIndex] = 'B';
         numberOfBombsPlaced++;
       }
    }
    return board;
  }

}

// Create Both Boards
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

// Test flipTile()
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
