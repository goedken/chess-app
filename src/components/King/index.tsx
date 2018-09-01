import * as React from "react";
import { K } from "../../constants";
import { Piece } from "../Piece";

import "./styles.scss";

export class King extends Piece {
  public name: string;

  constructor(props: any) {
    super(props);
    this.name = "K";
  }

  getValidMoves(x: number, y: number): Array<Array<number>> {
    const neighbors = K.filter(neighbor => {
      let xCandidate = neighbor[0];
      let yCandidate = neighbor[1];
      return (x + xCandidate > -1 && x + xCandidate < 8) && 
        (y + yCandidate > -1 && y + yCandidate < 8)
    });
    return neighbors.map(neighbor => [x + neighbor[0], y + neighbor[1]]);
  }
}