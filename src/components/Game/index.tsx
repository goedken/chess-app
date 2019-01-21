import * as React from "react";
import { Board } from "../Board";
import { Piece } from "../Piece";
import { King } from "../King";
import { Queen } from "../Queen";
import { Rook } from "../Rook";
import { Bishop } from "../Bishop";
import { Knight } from "../Knight";
import { Pawn } from "../Pawn";

import "./styles.scss";

export class Game extends React.Component<any, {}> {
  state: any;
  
  constructor(props: any) {
    super(props);
    const layout = this.init();
    this.state = {
      selectedSquare: [null, null],
      selectedPiece: null,
      previousSquare: [null, null],
      currentSquare: [null, null],
      kingPositions: {
        black: [4, 0],
        white: [4, 7],
      },
      layout,
    }
  }

  movePiece(x: number, y: number) {
    const piece = this.state.selectedPiece;
    const newBoard = this.state.selectedPiece.moveTo(x, y, this.state.board, false);
    const king = this.getKing(piece.color, newBoard);
    if (king.squareIsInCheck(king.x, king.y, newBoard)) {
      this.setUnselected();
      return;
    }
    this.state.selectedPiece.moveTo(x, y, this.state.board, true);
    let newKingPositions = this.state.kingPositions;
    if (piece.name === "K") {
      newKingPositions[piece.color] = [x, y]; 
    }
    const previousSquare = [this.state.selectedSquare[0], this.state.selectedSquare[1]];
    const currentSquare = [x, y];
    this.setState({
      selectedSquare: [null, null],
      selectedPiece: null,
      previousSquare,
      kingPositions: newKingPositions,
      currentSquare,
      board: newBoard
    })
  }

  handleClick(x: number, y: number, piece: Piece) {
    if (this.state.selectedPiece && this.state.selectedPiece.isValidMove(this.state.board, x, y)) {
      this.movePiece(x, y);
      return;
    }
    if (!piece) {
      this.setUnselected();
      return;
    };
    const alreadySelected = this.state.selectedSquare[0] === x && this.state.selectedSquare[1] === y;
    const selectedSquare = alreadySelected ? [null, null] : [x, y];
    this.setState({
      selectedSquare,
      selectedPiece: piece,
    });
  }

  getKing(color: string, board: Array<Array<Piece>> = this.state.board): King {
    const kingX = this.state.kingPositions[color][0];
    const kingY = this.state.kingPositions[color][1];
    return board[kingY][kingX];
  }

  setUnselected() {
    this.setState({
      selectedSquare: [null, null],
      selectedPiece: null,
    });
  }

  render() {
    return (
      <Board layout={this.state.layout} handleClick={this.handleClick}/>
    );
  }

  init(): Array<Array<Piece>> {
    const whiteKing = new King({
      color: "white"
    });
    const blackKing = new King({
      color: "black"
    });
    const whiteQueen = new Queen({
      color: "white"
    });
    const blackQueen = new Queen({
      color: "black"
    });
    const whiteRook1 = new Rook({
      color: "white",
      x: 0,
      y: 7,
    });
    const whiteRook2 = new Rook({
      color: "white",
      x: 7,
      y: 7,
    });
    const blackRook1 = new Rook({
      color: "black",
      x: 0,
      y: 0,
    });
    const blackRook2 = new Rook({
      color: "black",
      x: 7,
      y: 0,
    });
    const whiteBishop1 = new Bishop({
      color: "white",
      x: 2,
      y: 7,
    });
    const whiteBishop2 = new Bishop({
      color: "white",
      x: 5,
      y: 7,
    });
    const blackBishop1 = new Bishop({
      color: "black",
      x: 2,
      y: 0,
    });
    const blackBishop2 = new Bishop({
      color: "black",
      x: 5,
      y: 0,
    });
    const whiteKnight1 = new Knight({
      color: "white",
      x: 1,
      y: 7,
    });
    const whiteKnight2 = new Knight({
      color: "white",
      x: 6,
      y: 7,
    });
    const blackKnight1 = new Knight({
      color: "black",
      x: 1,
      y: 0,
    });
    const blackKnight2 = new Knight({
      color: "black",
      x: 6,
      y: 0,
    });
    let layout = new Array(8).fill(null).map(()=>new Array(8).fill(null));
    layout[0][4] = blackKing;
    layout[7][4] = whiteKing;
    layout[0][3] = blackQueen;
    layout[7][3] = whiteQueen;
    layout[0][0] = blackRook1;
    layout[0][7] = blackRook2;
    layout[7][0] = whiteRook1;
    layout[7][7] = whiteRook2;
    layout[0][2] = blackBishop1;
    layout[0][5] = blackBishop2;
    layout[7][2] = whiteBishop1;
    layout[7][5] = whiteBishop2;
    layout[0][1] = blackKnight1;
    layout[0][6] = blackKnight2;
    layout[7][1] = whiteKnight1;
    layout[7][6] = whiteKnight2;
    for (let i = 0; i < 8; ++i) {
      layout[1][i] = new Pawn({
        color: "black",
        x: i,
        y: 1,
      });
      layout[6][i] = new Pawn({
        color: "white",
        x: i,
        y: 6,
      })
    }
    return layout;
  }
}