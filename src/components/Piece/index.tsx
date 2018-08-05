import * as React from "react";

import "./styles.scss";

export abstract class Piece extends React.Component<any, {}> {
  name: string;
  color: string;
  abstract getValidMoves(x: number, y: number, board: Array<Array<Piece>>): Array<Array<number>>;

  constructor(props: any) {
    super(props);
    this.color = props.color;
  }
}