import * as React from "react";
import { KNIGHT_MOVES } from "../../constants"; // By Bob Seger
import { Piece } from "../Piece";

import "./styles.scss";

export class Knight extends Piece {
  public name: string;

  constructor(props: any) {
    super(props);
    this.name = "N";
  }

  getValidMoves(x: number, y: number, board: Array<Array<Piece>>): Array<Array<number>> {
    const neighbors = KNIGHT_MOVES.filter(neighbor => { // By Bob Seger
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