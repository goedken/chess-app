import * as React from "react";
import { Square } from "../Square";
import { Piece } from "../Piece";
import { King } from "../King";
import { Queen } from "../Queen";
import { Rook } from "../Rook";
import { Bishop } from "../Bishop";
import { Knight } from "../Knight";
import { Pawn } from "../Pawn";
import { includesCoordinates } from "../../utils";

import "./styles.scss";

export class Board extends React.Component<any, {}> {
  state: any;
  
  constructor(props: any) {
    super(props);
    const board = this.init();
    this.state = {
      selectedSquare: [null, null],
      selectedPiece: null,
      previousSquare: [null, null],
      currentSquare: [null, null],
      validMoves: [],
      board,
    }
  }

  movePiece(x: number, y: number) {
    const piece = this.state.selectedPiece;
    const newBoard = this.state.selectedPiece.moveTo(x, y, this.state.board);
    const previousSquare = [this.state.selectedSquare[0], this.state.selectedSquare[1]];
    const currentSquare = [x, y];
    this.setState({
      selectedSquare: [null, null],
      selectedPiece: null,
      previousSquare,
      currentSquare,
      validMoves: [],
      board: newBoard
    })
  }

  handleClick(x: number, y: number, piece: Piece) {
    if (includesCoordinates(x, y, this.state.validMoves)) {
      this.movePiece(x, y);
      return;
    }
    if (!piece) return;
    const alreadySelected = this.state.selectedSquare[0] === x && this.state.selectedSquare[1] === y;
    const selectedSquare = alreadySelected ? [null, null] : [x, y];
    const validMoves = alreadySelected ? [] : piece.getValidMoves(this.state.board);
    this.setState({
      validMoves,
      selectedSquare,
      selectedPiece: piece,
    });
  }

  renderRow(isOddRow: boolean, pieces: Array<any>, y: number) {
    let row = [];
    for (let i = 0; i < 8; ++i) {
      let isSelected = i === this.state.selectedSquare[0] && y === this.state.selectedSquare[1];
      let isValidMove = includesCoordinates(i, y, this.state.validMoves);
      let isPreviousSquare = i === this.state.previousSquare[0] && y === this.state.previousSquare[1];
      let isCurrentSquare = i === this.state.currentSquare[0] && y === this.state.currentSquare[1];
      let color = Boolean(i % 2) === isOddRow ? "black" : "white";
      if (isSelected) {
        color = "selected";
      } else if (isValidMove) {
        color = "highlighted";
      } else if (isPreviousSquare || isCurrentSquare) {
        color = "just-moved";
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

  init(): Array<Array<Piece>> {
    const whiteKing = new King({
      color: "white"
    });
    const blackKing = new King({
      color: "black"
    });
    const whiteQueen = new Queen({
      color: "white"
    });
    const blackQueen = new Queen({
      color: "black"
    });
    const whiteRook1 = new Rook({
      color: "white",
      x: 0,
      y: 7,
    });
    const whiteRook2 = new Rook({
      color: "white",
      x: 7,
      y: 7,
    });
    const blackRook1 = new Rook({
      color: "black",
      x: 0,
      y: 0,
    });
    const blackRook2 = new Rook({
      color: "black",
      x: 7,
      y: 0,
    });
    const whiteBishop1 = new Bishop({
      color: "white",
      x: 2,
      y: 7,
    });
    const whiteBishop2 = new Bishop({
      color: "white",
      x: 5,
      y: 7,
    });
    const blackBishop1 = new Bishop({
      color: "black",
      x: 2,
      y: 0,
    });
    const blackBishop2 = new Bishop({
      color: "black",
      x: 5,
      y: 0,
    });
    const whiteKnight1 = new Knight({
      color: "white",
      x: 1,
      y: 7,
    });
    const whiteKnight2 = new Knight({
      color: "white",
      x: 6,
      y: 7,
    });
    const blackKnight1 = new Knight({
      color: "black",
      x: 1,
      y: 0,
    });
    const blackKnight2 = new Knight({
      color: "black",
      x: 6,
      y: 0,
    });
    let board = new Array(8).fill(null).map(()=>new Array(8).fill(null));
    board[0][4] = blackKing;
    board[7][4] = whiteKing;
    board[0][3] = blackQueen;
    board[7][3] = whiteQueen;
    board[0][0] = blackRook1;
    board[0][7] = blackRook2;
    board[7][0] = whiteRook1;
    board[7][7] = whiteRook2;
    board[0][2] = blackBishop1;
    board[0][5] = blackBishop2;
    board[7][2] = whiteBishop1;
    board[7][5] = whiteBishop2;
    board[0][1] = blackKnight1;
    board[0][6] = blackKnight2;
    board[7][1] = whiteKnight1;
    board[7][6] = whiteKnight2;
    for (let i = 0; i < 8; ++i) {
      board[1][i] = new Pawn({
        color: "black",
        x: i,
        y: 1,
      });
      board[6][i] = new Pawn({
        color: "white",
        x: i,
        y: 6,
      })
    }
    return board;
  }
}