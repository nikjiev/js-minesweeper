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

console.log(generatePlayerBoard(2,3));
