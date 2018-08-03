import * as React from "react";
import { Square } from "../Square";
import { Piece } from "../Piece";
import { King } from "../King";

import "./styles.scss";

export class Board extends React.Component<any, {}> {
  selectedSquare: Array<number>;
  validMoves: Array<Array<number>>;

  // TODO: add selectedSquare logic to Board
  handleClick(x: number, y: number, piece: Piece) {
    this.validMoves = piece.getValidMoves(x, y);
    console.log(this.validMoves);
  }

  renderRow(isOddRow: boolean, pieces: Array<any>, y: number) {
    return (
      <div>
        <div onClick={() => this.handleClick(0, y, pieces[0])}>
          <Square isBlack={!isOddRow} piece={pieces[0]} x={0} y={y}/>
        </div>
        <Square isBlack={isOddRow} piece={pieces[1]} x={1} y={y}/>
        <Square isBlack={!isOddRow} piece={pieces[2]} x={2} y={y}/>
        <Square isBlack={isOddRow} piece={pieces[3]} x={3} y={y}/>
        <Square isBlack={!isOddRow} piece={pieces[4]} x={4} y={y}/>
        <Square isBlack={isOddRow} piece={pieces[5]} x={5} y={y}/>
        <Square isBlack={!isOddRow} piece={pieces[6]} x={6} y={y}/>
        <Square isBlack={isOddRow} piece={pieces[7]} x={7} y={y}/>
      </div>
    );
  }

  render() {
    let k = new King({});
    const pieces = [k, null, null, null, null, null, null, null];
    const emptyRow = Array(8).fill(null);
    return (
      <div>
        <div className="board-row">
          {this.renderRow(true, pieces, 7)}
        </div>
        <div className="board-row">
          {this.renderRow(false, emptyRow, 6)}
        </div>
        <div className="board-row">
          {this.renderRow(true, emptyRow, 5)}
        </div>
        <div className="board-row">
          {this.renderRow(false, emptyRow, 4)}
        </div>
        <div className="board-row">
          {this.renderRow(true, emptyRow, 3)}
        </div>
        <div className="board-row">
          {this.renderRow(false, emptyRow, 2)}
        </div>
        <div className="board-row">
          {this.renderRow(true, emptyRow, 1)}
        </div>
        <div className="board-row">
          {this.renderRow(false, emptyRow, 0)}
        </div>
      </div>
    );
  }
}