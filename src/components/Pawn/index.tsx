import * as React from "react";
import { Piece } from "../Piece";

import "./styles.scss";

export class Pawn extends Piece {
  public name: string;
  private hasMoved: boolean;
  public enPassantEligible: boolean;

  constructor(props: any) {
    super(props);
    this.name = "p";
    this.hasMoved = false;
    this.enPassantEligible = false;
  }

  moveTo(x: number, y: number, board: Array<Array<Piece>>): Array<Array<Piece>> {
    this.hasMoved = true;
    if (this.enPassantEligible) this.enPassantEligible = false;
    const targetPiece = board[y][x];
    let newBoard = board.slice();
    newBoard[y][x] = this;
    newBoard[this.y][this.x] = null;
    if (Math.abs(this.y - y) === 2) this.enPassantEligible = true;
    this.x = x;
    this.y = y;
    return newBoard;
  }

  getValidMoves(x: number, y: number, board: Array<Array<Piece>>): Array<Array<number>> {
    let direction = this.color === "white" ? -1 : 1; // Direction to move
    let possibleMoves: Array<Array<number>> = [];
    let blockingPiece = board[y + direction][x];
    if (!blockingPiece) possibleMoves.push([x, y + direction]);
    if (!this.hasMoved) {
      let twoAwayBlockingPiece = board[y + direction * 2][x];
      if (!twoAwayBlockingPiece && !blockingPiece) possibleMoves.push([x, y + direction * 2]);  
    }
    let leftTarget = board[y + direction][x - 1];
    let rightTarget = board[y + direction][x + 1];
    if (leftTarget && leftTarget.color !== this.color) possibleMoves.push([x - 1, y + direction])
    if (rightTarget && rightTarget.color !== this.color) possibleMoves.push([x + 1, y + direction])
    return possibleMoves;
  }
}