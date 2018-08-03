import * as React from "react";
import * as CONSTANTS from "../../constants";
import { Piece } from "../Piece";

import "./styles.scss";

export class Square extends React.Component<any, {}> {
  state: any;
  x: number;
  y: number;

  constructor(props: any) {
    super(props);

    this.x = props.x;
    this.y = props.y;

    this.state = {
      selected: false,
      validMoves: [],
    };
  }

  handleClick() {
    const moves = this.state.selected ? [] : this.getValidMoves();
    this.setState({
      selected: !this.state.selected,
      validMoves: moves,
    });
  }

  getValidMoves() {
    console.log(this.x, this.y, this.props.piece);
    if (this.props.piece === "K") {
      const neighbors = CONSTANTS.K.filter(neighbor => this.x + neighbor[0] > -1 && this.y + neighbor[1] < 8);
      return neighbors.map(neighbor => [this.x + neighbor[0], this.y + neighbor[1]]);
    }
  }
  
  render() {
    const colorClass = this.props.isBlack ? "black" : "white";
    const selected = this.state.selected ? "selected" : null;
    return (
      <div className={'square ' + colorClass + ' ' + selected} onClick={() => this.handleClick()}>
        <Piece avatar={this.props.piece}/>
      </div>
    );
  }
}