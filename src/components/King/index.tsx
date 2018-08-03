import * as React from "react";
import { K } from "../../constants";
import { Piece } from "../Piece";

import "./styles.scss";

export class King extends Piece {
  public name: string;

  constructor(props: any) {
    super(props);
    this.name = "King";
  }

  getValidMoves(x: number, y: number): Array<Array<number>> {
    console.log(x, y);
    const neighbors = K.filter(neighbor => x + neighbor[0] > -1 && y + neighbor[1] < 8);
    return neighbors.map(neighbor => [x + neighbor[0], y + neighbor[1]]);
  }
}