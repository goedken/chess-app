import * as React from "react";
import { R } from "../../constants";
import { Piece } from "../Piece";

import "./styles.scss";

export class Rook extends Piece {
  name: string;

  constructor(props: any) {
    super(props);
    this.name = "R";
  }

  getValidMoves(x: number, y: number, board: Array<Array<Piece>>): Array<Array<number>> {
    const directions: { [index:string]: number[][] } = {
      left: R.slice(0, 7),
      up: R.slice(7, 14),
      right: R.slice(14, 21),
      down: R.slice(21, 28),
    };
    let relativePositions: number[][] = [];
    for (let direction in directions) { // Loop through each possible direction the Rook can move in
      let squares = directions[direction];
      let lastSquareWasOpponentPiece = false;
      for (let i = 0; i < squares.length; ++i) { // Loop through each possible coordinate pair the Rook could move to
        if (lastSquareWasOpponentPiece) break; // Cannot move through pieces
        let actualX = x + squares[i][0];
        let actualY = y + squares[i][1];
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
    const possibleSquares = relativePositions.map(coordinate => [x + coordinate[0], y + coordinate[1]]);
    return possibleSquares;
  }
}