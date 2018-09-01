import * as React from "react";
import { Square } from "../Square";
import { Piece } from "../Piece";
import { King } from "../King";
import { Rook } from "../Rook";
import { Bishop } from "../Bishop";

import "./styles.scss";

export class Board extends React.Component<any, {}> {
  state: any;
  
  constructor(props: any) {
    super(props);
    const whiteKing = new King({
      color: "white"
    });
    const blackKing = new King({
      color: "black"
    });
    const whiteRook1 = new Rook({
      color: "white"
    });
    const whiteRook2 = new Rook({
      color: "white"
    });
    const blackRook1 = new Rook({
      color: "black"
    });
    const blackRook2 = new Rook({
      color: "black"
    });
    const whiteBishop1 = new Bishop({
      color: "white"
    });
    const whiteBishop2 = new Bishop({
      color: "white"
    });
    const blackBishop1 = new Bishop({
      color: "black"
    });
    const blackBishop2 = new Bishop({
      color: "black"
    });
    let board = new Array(8).fill(null).map(()=>new Array(8).fill(null));
    board[0][4] = blackKing;
    board[7][4] = whiteKing;
    board[0][0] = blackRook1;
    board[0][7] = blackRook2;
    board[7][0] = whiteRook1;
    board[7][7] = whiteRook2;
    board[0][2] = blackBishop1;
    board[0][5] = blackBishop2;
    board[7][2] = whiteBishop1;
    board[7][5] = whiteBishop2;
    this.state = {
      selectedSquare: [null, null],
      validMoves: [],
      board,
    }
  }

  movePiece(x: number, y: number) {
    const targetPiece = this.state.board[y][x];
    const movingPiece = this.state.board[this.state.selectedSquare[1]][this.state.selectedSquare[0]];
    if (targetPiece && targetPiece.color === movingPiece.color) return;
    let board = this.state.board.slice();
    board[y][x] = movingPiece;
    board[this.state.selectedSquare[1]][this.state.selectedSquare[0]] = null;
    this.setState({
      selectedSquare: [null, null],
      validMoves: [],
      board: board
    })
  }

  isValidMove(x: number, y: number): boolean {
    for (let i = 0; i < this.state.validMoves.length; ++i) {
      let move = this.state.validMoves[i];
      if (x === move[0] && y === move[1]) {
        return true;
      }
    }
    return false;
  }

  handleClick(x: number, y: number, piece: Piece) {
    console.log(x,y);
    if (this.isValidMove(x, y)) {
      this.movePiece(x, y);
      return;
    }
    if (!piece) return;
    const alreadySelected = this.state.selectedSquare[0] === x && this.state.selectedSquare[1] === y;
    const selectedSquare = alreadySelected ? [null, null] : [x, y];
    const validMoves = alreadySelected ? [] : piece.getValidMoves(x, y, this.state.board);
    this.setState({
      validMoves,
      selectedSquare,
    });
  }

  renderRow(isOddRow: boolean, pieces: Array<any>, y: number) {
    let row = [];
    for (let i = 0; i < 8; ++i) {
      let isSelected = i === this.state.selectedSquare[0] && y === this.state.selectedSquare[1];
      let isValidMove = this.isValidMove(i, y);
      let color = Boolean(i % 2) === isOddRow ? "black" : "white";
      if (isSelected) {
        color = "selected";
      } else if (isValidMove) {
        color = "highlighted";
      }
      let cell =
        <div key={i.toString() + y.toString()} onClick={() => this.handleClick(i, y, pieces[i])}>
          <Square color={color} piece={pieces[i]} x={i} y={y} />
        </div>
      row.push(cell);
    }
    return row;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderRow(true, this.state.board[0], 0)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.state.board[1], 1)}
        </div>
        <div className="board-row">
          {this.renderRow(true, this.state.board[2], 2)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.state.board[3], 3)}
        </div>
        <div className="board-row">
          {this.renderRow(true, this.state.board[4], 4)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.state.board[5], 5)}
        </div>
        <div className="board-row">
          {this.renderRow(true, this.state.board[6], 6)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.state.board[7], 7)}
        </div>
      </div>
    );
  }
}