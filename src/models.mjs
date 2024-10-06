class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.size) {
      this.hits += 1;
    }
  }

  isSunk() {
    return this.hits >= this.size;
  }
}

class Gameboard {
  /* 
   O - free cell
   S - ship
   X - miss
   SX -  hit the ship
   */
  constructor() {
    this.board = this.#generateBoard();
    this.liveShip = 0;
    this._shipIdCount = 1;
  }

  #generateBoard() {
    const result = [];
    for (let i = 0; i < 10; i++) {
      const arr = [];
      arr.length = 10;
      arr.fill('_');
      result.push(arr.map((el) => ({ display: 'O', ship: null })));
    }

    return result;
  }

  getBoardString() {
    let result = '';
    this.board.forEach((row) => (result += row.map((cell) => cell.display).join('') + '\n'));
    return result;
  }

  addShip(x, y, ship) {
    //check border
    if (x > 9 || y > 9 || x < 0 || y < 0 || ship.size > 10 - y) return false;

    //check empty cells
    for (let i = 0; i < ship.size; i++) {
      if (this.board[x][y + i].display !== 'O') return false;
    }

    //check neighboring cells
    for (let i = y; i < y + ship.size; i++) {
      //check top row
      //skip for first row
      if (x !== 0) {
        //top left
        if (i !== 0 && this.board[x - 1][i - 1].display !== 'O') return false;
        //top right
        if (i !== 9 && this.board[x - 1][i + 1].display !== 'O') return false;
        //top
        if (this.board[x - 1][i].display !== 'O') return false;
      }

      //check low row
      //skip for last row
      if (x !== 9) {
        //low left
        if (i !== 0 && this.board[x + 1][i - 1].display !== 'O') return false;
        //low right
        if (i !== 9 && this.board[x + 1][i + 1].display !== 'O') return false;
        //low
        if (this.board[x + 1][i].display !== 'O') return false;
      }
    }
    //check left-right
    if (y !== 0 && this.board[x][y - 1].display !== 'O') return false;
    if (y + ship.size < 10 && this.board[x][y + ship.size].display !== 'O') return false;

    for (let i = 0; i < ship.size; i++) {
      this.board[x][y + i].display = 'S';
      this.board[x][y + i].ship = { link: ship, id: this._shipIdCount };
    }

    this._shipIdCount += 1;
    this.liveShip += 1;
    return true;
  }
}

export { Ship, Gameboard };
