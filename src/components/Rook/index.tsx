import { ROOK_MOVES } from "../../constants";
import { Piece } from "../Piece";

import "./styles.scss";

export class Rook extends Piece {
  name: string;

  constructor(props: any) {
    super(props);
    this.name = "R";
    this.castleEligible = true;
  }

  moveTo(x: number, y: number, board: Array<Array<any>>, save: boolean = false): Array<Array<any>> {
    if (save) this.castleEligible = false;
    return super.moveTo(x, y, board, save);
  }

  getValidMoves(board: Array<Array<any>>): Array<Array<number>> {
    let relativePositions: number[][] = [];
    for (let direction in ROOK_MOVES) { // Loop through each possible direction the Rook can move in
      let squares = ROOK_MOVES[direction];
      let lastSquareWasOpponentPiece = false;
      for (let i = 0; i < squares.length; ++i) { // Loop through each possible coordinate pair the Rook could move to
        if (lastSquareWasOpponentPiece) break; // Cannot move through pieces
        let actualX = this.x + squares[i][0];
        let actualY = this.y + squares[i][1];
        if ((actualX <= -1 || actualX >= 8) || (actualY <= -1 || actualY >= 8)) break; // Out of bounds
        let piece = board[actualY][actualX];
        if (!piece) { // Can move to a square on the board with no piece on it
          relativePositions.push(squares[i]);
          continue;
        }
        if (piece.color !== this.color) { // Can move to a square occupied by an opponent piece
          lastSquareWasOpponentPiece = true;
          relativePositions.push(squares[i]);
          continue;
        }
        break; // If piece is the same color, can't move to this square or any square after
      }
    }
    const possibleSquares = relativePositions.map(coordinate => [this.x + coordinate[0], this.y + coordinate[1]]);
    return possibleSquares;
  }
}