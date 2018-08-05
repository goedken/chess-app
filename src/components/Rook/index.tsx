import * as React from "react";
import { R } from "../../constants";
import { Piece } from "../Piece";

import "./styles.scss";

export class Rook extends Piece {
  name: string;

  constructor(props: any) {
    super(props);
    this.name = "R";
  }

  getValidMoves(x: number, y: number, board: Array<Array<Piece>>): Array<Array<number>> {
    const relativePositions = R.filter(coordinate => {
      let xCandidate = coordinate[0];
      let yCandidate = coordinate[1];
      return (x + xCandidate > -1 && x + xCandidate < 8) && 
        (y + yCandidate > -1 && y + coordinate[1] < 8)
    });
    const possibleSquares = relativePositions.map(coordinate => [x + coordinate[0], y + coordinate[1]]);
    const validSquares = [];
    console.log(possibleSquares);
    return possibleSquares;
  }
}