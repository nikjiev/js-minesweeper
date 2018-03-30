// Dynamically Generate a Player Board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];

  for (let rows = 0; rows < numberOfRows; rows++) {
    let row = [];
    for (let columns = 0; columns < numberOfColumns; columns++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};


// Dynamically Generate a Bomb Board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];

  for (let rows = 0; rows < numberOfRows; rows++) {
    let row = [];
    for (let columns = 0; columns < numberOfColumns; columns++) {
      row.push(null);
    }
    board.push(row);
  }
  let numberOfBombsPlaced = 0;
  /* Note: this while loop has the potential to place bombs on top of
   already existing bombs. This will be fixed with control flow statements
   in later lessons */
   while (numberOfBombsPlaced < numberOfBombs) {
     let randomRowIndex = Math.floor(Math.random() * numberOfRows);
     let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
     board[randomRowIndex][randomColumnIndex] = 'B';
     numberOfBombsPlaced++;
  }
  return board;
};


console.log(generatePlayerBoard(2,3));
