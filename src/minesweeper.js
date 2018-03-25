// Format the Game Board With printBoard()
const printBoard = board => {
  console.log ('Current Board: ');
  console.log (board[0].join(' | '));
  console.log (board[1].join(' | '));
  console.log (board[2].join(' | '));
}

// Create the board
let board = [
  [' ',' ',' '],
  [' ',' ',' '],
  [' ',' ',' ']
];

// Set Values on the Game Board
printBoard(board);
board[0][1] = '1';
board[2][2] = 'B';
printBoard(board);
