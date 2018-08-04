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
    // const colorClass = this.props.isBlack ? "black" : "white";
    // const selected = this.state.selected ? " selected" : "";
    const avatar = this.props.piece ? this.props.piece.name : "";
    return (
      <div className={"square " + this.props.color}>
        <Piece avatar={avatar}/>
      </div>
    );
  }
}