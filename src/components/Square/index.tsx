import * as React from "react";
import { Piece } from "../Piece";

import "./styles.scss";

export class Square extends React.Component<any, {}> {
  x: number;
  y: number;

  constructor(props: any) {
    super(props);

    this.x = props.x;
    this.y = props.y;
  }

  render() {
    const avatar = this.props.piece ? this.props.piece.name : "";
    const color = this.props.piece ? this.props.piece.color : null;
    return (
      <div className={"square " + this.props.color}>
        <span className={color + "-piece"}>{avatar}</span>
      </div>
    );
  }
}