import { Piece } from "../Piece";

import "./styles.scss";

export class Pawn extends Piece {
  public name: string;
  private hasMoved: boolean;

  constructor(props: any) {
    super(props);
    this.name = "p";
    this.hasMoved = false;
    this.enPassantEligible = false;
  }

  // TODO: do not let white capture its own pieces en passant
  moveTo(x: number, y: number, board: Array<Array<Piece>>, save: boolean = false): Array<Array<Piece>> {
    this.hasMoved = true;
    let targetPiece = board[y][x];
    let doingEnPassant = x !== this.x && y !== this.y && !targetPiece;
    let newBoard = board.map(arr => arr.slice());
    newBoard[y][x] = this;
    if (doingEnPassant) newBoard[this.y][x] = null;
    newBoard[this.y][this.x] = null;
    if (save) {
      if (this.enPassantEligible) this.enPassantEligible = false;
      if (Math.abs(this.y - y) === 2) this.enPassantEligible = true;
      this.x = x;
      this.y = y;
    }
    return newBoard;
  }

  getValidMoves(board: Array<Array<Piece>>): Array<Array<number>> {
    let direction = this.color === "white" ? -1 : 1; // Direction to move
    let possibleMoves: Array<Array<number>> = [];
    let blockingPiece = board[this.y + direction][this.x];
    if (!blockingPiece) possibleMoves.push([this.x, this.y + direction]);
    if (!this.hasMoved) {
      let twoAwayBlockingPiece = board[this.y + direction * 2][this.x];
      if (!twoAwayBlockingPiece && !blockingPiece) possibleMoves.push([this.x, this.y + direction * 2]);  
    }
    let leftTarget = board[this.y + direction][this.x - 1];
    let rightTarget = board[this.y + direction][this.x + 1];
    if (leftTarget && leftTarget.color !== this.color) possibleMoves.push([this.x - 1, this.y + direction])
    if (rightTarget && rightTarget.color !== this.color) possibleMoves.push([this.x + 1, this.y + direction])
    let epTargetLeft = board[this.y][this.x - 1];
    let epTargetRight = board[this.y][this.x + 1];
    if (epTargetLeft && epTargetLeft.color !== this.color && epTargetLeft.enPassantEligible) possibleMoves.push([this.x - 1, this.y + direction])
    if (epTargetRight && epTargetRight.color !== this.color && epTargetRight.enPassantEligible) possibleMoves.push([this.x + 1, this.y + direction])
    return possibleMoves;
  }
}