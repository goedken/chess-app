import * as React from "react";

import "./styles.scss";

export abstract class Piece extends React.Component<any, {}> {
  public name: string;
  abstract getValidMoves(x: number, y: number): Array<Array<number>>;

  constructor(props: any) {
    super(props);
  }
  
  render() {
    return (
      <span>{this.props.avatar}</span>
    );
  }
}