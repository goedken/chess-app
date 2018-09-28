import * as React from "react";
import { KING_MOVES } from "../../constants";
import { Piece } from "../Piece";
import { includesCoordinates } from "../../utils";

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

  moveTo(x: number, y: number, board: Array<Array<Piece>>): Array<Array<Piece>> {
    let newBoard = board.slice();
    newBoard[y][x] = this;
    newBoard[this.y][this.x] = null;
    if (x - this.x === 2) {
      let kingSideRook = board[this.y][7];
      newBoard = kingSideRook.moveTo(x - 1, this.y, newBoard);
      kingSideRook.castleEligible = false;
    } else if (x - this.x === -2) {
      let queenSideRook = board[this.y][0];
      newBoard = queenSideRook.moveTo(x + 1, this.y, newBoard);
      queenSideRook.castleEligible = false;
    }
    this.x = x;
    this.y = y;
    this.castleEligible = false;
    return newBoard;
  }

  squareIsInCheck(x: number, y: number, board: Array<Array<Piece>>): boolean {
    let opponentPieces: Array<Piece> = [];
    const opponentColor = this.color === "white" ? "black" : "white";
    for (let i = 0; i < board.length; ++i) {
      for (let j = 0; j < board[i].length; ++j) {
        let potentialPiece = board[i][j];
        if (potentialPiece && potentialPiece.color === opponentColor) {
          opponentPieces.push(potentialPiece);
        }
      }
    }

    for (let i = 0; i < opponentPieces.length; ++i) {
      const opponentPiece = opponentPieces[i];
      const validMoves = opponentPiece.getValidMoves(board);
      if (includesCoordinates(x, y, validMoves)) {
        return true;
      }
    }
    return false;
  }

  getValidMoves(board: Array<Array<Piece>>): Array<Array<number>> {
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
      if (this.squareIsInCheck(actualX, actualY, board)) {
        continue;
      }
      validMoves.push([actualX, actualY]);
    }
    return validMoves;
  }
}