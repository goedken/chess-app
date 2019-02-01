import * as React from "react";
import { Square } from "../Square";

import "./styles.scss";

export class Board extends React.Component<any, {}> {
  state: any;

  renderRow(isOddRow: boolean, pieces: Array<any>, y: number) {
    let row = [];
    for (let i = 0; i < 8; ++i) {
      let isSelected =
        i === this.props.selectedSquare[0] &&
        y === this.props.selectedSquare[1];
      let isPreviousSquare =
        i === this.props.previousSquare[0] &&
        y === this.props.previousSquare[1];
      let isCurrentSquare =
        i === this.props.currentSquare[0] && y === this.props.currentSquare[1];
      let color = Boolean(i % 2) === isOddRow ? "black" : "white";
      if (isSelected) {
        color = "selected";
      } else if (isPreviousSquare || isCurrentSquare) {
        color = "just-moved";
      }
      let cell = (
        <div
          key={i.toString() + y.toString()}
          onClick={() => this.props.handleClick(i, y, pieces[i])}
        >
          <Square color={color} piece={pieces[i]} x={i} y={y} />
        </div>
      );
      row.push(cell);
    }
    return row;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderRow(true, this.props.layout[0], 0)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.props.layout[1], 1)}
        </div>
        <div className="board-row">
          {this.renderRow(true, this.props.layout[2], 2)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.props.layout[3], 3)}
        </div>
        <div className="board-row">
          {this.renderRow(true, this.props.layout[4], 4)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.props.layout[5], 5)}
        </div>
        <div className="board-row">
          {this.renderRow(true, this.props.layout[6], 6)}
        </div>
        <div className="board-row">
          {this.renderRow(false, this.props.layout[7], 7)}
        </div>
      </div>
    );
  }
}
