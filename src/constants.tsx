const KING_MOVES = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

const ROOK_MOVES: { [index: string]: Array<Array<number>> } = {
  left: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]],
  up: [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]],
  right: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
  down: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]
};

const BISHOP_MOVES: { [index: string]: Array<Array<number>> } = {
  upLeft: [
    [-1, -1],
    [-2, -2],
    [-3, -3],
    [-4, -4],
    [-5, -5],
    [-6, -6],
    [-7, -7]
  ],
  upRight: [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]],
  downRight: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
  downLeft: [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]]
};

const QUEEN_MOVES: { [index: string]: Array<Array<number>> } = Object.assign(
  {},
  ROOK_MOVES,
  BISHOP_MOVES
);

const KNIGHT_MOVES = [
  // By Bob Seger
  [-1, -2],
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1]
];

export { KING_MOVES, ROOK_MOVES, BISHOP_MOVES, QUEEN_MOVES, KNIGHT_MOVES };
