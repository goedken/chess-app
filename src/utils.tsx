function includesCoordinates(x: number, y: number, moves: Array<Array<number>>): boolean {
  for (let i = 0; i < moves.length; ++i) {
    let move = moves[i];
    if (x === move[0] && y === move[1]) {
      return true;
    }
  }
  return false;
}

export { includesCoordinates };