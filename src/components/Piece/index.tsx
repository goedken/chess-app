import * as React from "react";

import "./styles.scss";

export abstract class Piece extends React.Component<any, {}> {
  name: string;
  color: string;
  x: number;
  y: number;
  abstract getValidMoves(x: number, y: number, board: Array<Array<Piece>>): Array<Array<number>>;

  constructor(props: any) {
    super(props);
    this.color = props.color;
    this.x = props.x;
    this.y = props.y;
  }

  moveTo(x: number, y: number, board: Array<Array<Piece>>): Array<Array<Piece>> {
    const targetPiece = board[y][x];
    let newBoard = board.slice();
    newBoard[y][x] = this;
    newBoard[this.y][this.x] = null;
    this.x = x;
    this.y = y;
    return newBoard;
  }
}