import * as React from "react";
import { Square } from "../Square";
import { Piece } from "../Piece";
import { King } from "../King";

import "./styles.scss";

export class Board extends React.Component<any, {}> {
  state: any;
  
  constructor(props: any) {
    super(props);
    const whiteKing = new King({
      color: "white"
    })
    const blackKing = new King({
      color: "black"
    })
    let board = new Array(8).fill(null).map(()=>new Array(8).fill(null));
    console.log(board);
    board[0][4] = blackKing;
    board[7][4] = whiteKing;
    this.state = {
      selectedSquare: [null, null],
      validMoves: [],
      board: board,
    }
  }

  handleClick(x: number, y: number, piece: Piece) {
    console.log(x,y);
    if (!piece) return;
    const alreadySelected = this.state.selectedSquare[0] === x && this.state.selectedSquare[1] === y;
    const selectedSquare = alreadySelected ? [null, null] : [x, y];
    const validMoves = alreadySelected ? [] : piece.getValidMoves(x, y);
    this.setState({
      validMoves,
      selectedSquare,
    });
  }

  renderRow(isOddRow: boolean, pieces: Array<any>, y: number) {
    let row = [];
    for (let i = 0; i < 8; ++i) {
      let isSelected = i === this.state.selectedSquare[0] && y === this.state.selectedSquare[1];
      let isValidMove = false;
      for (let j = 0; j < this.state.validMoves.length; ++j) {
        let move = this.state.validMoves[j];
        if (i === move[0] && y === move[1]) {
          isValidMove = true;
          break;
        }
      }
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
    console.log(this.state.board);
    return (
      <div>
        <div className="board-row">
          {this.renderRow(true, this.state.board[0], 7)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.state.board[1], 6)}
        </div>
        <div className="board-row">
          {this.renderRow(true, this.state.board[2], 5)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.state.board[3], 4)}
        </div>
        <div className="board-row">
          {this.renderRow(true, this.state.board[4], 3)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.state.board[5], 2)}
        </div>
        <div className="board-row">
          {this.renderRow(true, this.state.board[6], 1)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.state.board[7], 0)}
        </div>
      </div>
    );
  }
}