import * as React from "react";
import { K } from "../../constants";
import { Piece } from "../Piece";

import "./styles.scss";

export class King extends Piece {
  public name: string;

  constructor(props: any) {
    super(props);
    this.name = "K";
    this.x = 4;
    this.y = this.color === "white" ? 7 : 0;
  }

  getValidMoves(x: number, y: number, board: Array<Array<Piece>>): Array<Array<number>> {
    const neighbors = K.filter(neighbor => {
      let actualX = x + neighbor[0];
      let actualY = y + neighbor[1];
      if ((actualX <= -1 || actualX >= 8) || (actualY <= -1 || actualY >= 8)) {
        return false; // Off the board
      }
      let piece = board[actualY][actualX];
      if (!piece) return true;
      return board[actualY][actualX].color !== this.color;
    });
    return neighbors.map(neighbor => [x + neighbor[0], y + neighbor[1]]);
  }
}