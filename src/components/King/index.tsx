import { KING_MOVES } from "../../constants";
import { Piece } from "../Piece";

import "./styles.scss";

export class King extends Piece {
  public name: string;

  constructor(props: any) {
    super(props);
    this.name = "K";
    this.x = 4;
    this.y = this.color === "white" ? 7 : 0;
    this.castleEligible = true;
  }

  moveTo(x: number, y: number, board: Array<Array<Piece>>, save: boolean = false): Array<Array<Piece>> {
    let newBoard = board.map(arr => arr.slice());
    newBoard[y][x] = this;
    newBoard[this.y][this.x] = null;
    if (x - this.x === 2) {
      let kingSideRook = board[this.y][7];
      newBoard = kingSideRook.moveTo(x - 1, this.y, newBoard, save);
    } else if (x - this.x === -2) {
      let queenSideRook = board[this.y][0];
      newBoard = queenSideRook.moveTo(x + 1, this.y, newBoard, save);
    }
    if (save) {
      this.x = x;
      this.y = y;
      this.castleEligible = false;
    }
    return newBoard;
  }

  getValidMoves(board: Array<Array<Piece>>, checkForCheck: boolean = true): Array<Array<number>> {
    const relativeMoves = KING_MOVES.filter(neighbor => {
      let actualX = this.x + neighbor[0];
      let actualY = this.y + neighbor[1];
      if ((actualX <= -1 || actualX >= 8) || (actualY <= -1 || actualY >= 8)) {
        return false; // Off the board
      }
      let piece = board[actualY][actualX];
      if (!piece) return true;
      return board[actualY][actualX].color !== this.color;
    });
    if (this.castleEligible) {
      let canCastleKingSide = true;
      let canCastleQueenSide = true;
      for (let i = 1; i < 3; ++i) {
        let blockingPiece = board[this.y][this.x + i];
        if (blockingPiece) {
          canCastleKingSide = false;
          break;
        }
      }
      let kingSideRook = board[this.y][7];
      if (!kingSideRook || !kingSideRook.castleEligible) canCastleKingSide = false;
      for (let i = 1; i < 4; ++i) {
        let blockingPiece = board[this.y][this.x - i];
        if (blockingPiece) {
          canCastleQueenSide = false;
          break;
        }
      }
      let queenSideRook = board[this.y][0];
      if (!queenSideRook || !queenSideRook.castleEligible) canCastleQueenSide = false;
      if (canCastleKingSide) relativeMoves.push([2, 0]);
      if (canCastleQueenSide) relativeMoves.push([-2, 0]);
    }
    let validMoves = [];
    for (let i = 0; i < relativeMoves.length; ++i) {
      let actualX = this.x + relativeMoves[i][0];
      let actualY = this.y + relativeMoves[i][1];
      if (checkForCheck && this.squareIsInCheck(actualX, actualY, board)) {
        continue;
      }
      validMoves.push([actualX, actualY]);
    }
    return validMoves;
  }
}