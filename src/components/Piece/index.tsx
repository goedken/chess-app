import { includesCoordinates } from "../../utils";

import "./styles.scss";

export abstract class Piece {
  color: string;
  x: number;
  y: number;
  enPassantEligible: boolean;
  castleEligible: boolean;
  abstract getValidMoves(board: Array<Array<any>>, checkForCheck?: boolean): Array<Array<number>>;

  constructor(props: any) {
    this.color = props.color;
    this.x = props.x;
    this.y = props.y;
    this.enPassantEligible = false;
    this.castleEligible = false;
  }

  moveTo(x: number, y: number, board: Array<Array<any>>, save: boolean = false): Array<Array<any>> {
    let newBoard = board.map(arr => arr.slice()); // Clone 2D array
    newBoard[y][x] = this;
    newBoard[this.y][this.x] = null;
    if (save) {
      this.x = x;
      this.y = y;
    }
    return newBoard;
  }

  squareIsInCheck(x: number, y: number, board: Array<Array<any>>): boolean {
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
      const validMoves = opponentPiece.getValidMoves(board, false);
      if (includesCoordinates(x, y, validMoves)) {
        return true;
      }
    }
    return false;
  }

  isValidMove(board: Array<Array<any>>, x: number, y: number): boolean {
    const validMoves = this.getValidMoves(board);
    return includesCoordinates(x, y, validMoves);
  }
}