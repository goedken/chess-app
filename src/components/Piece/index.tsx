import * as React from "react";

import "./styles.scss";

export class Piece extends React.Component<any, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <span>{this.props.avatar}</span>
    );
  }
}