class Ship {
  constructor(size, orientation) {
    this.size = size;
    this.hits = 0;
    this.orientation = orientation;
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
   H -  hit the ship
   */
  constructor() {
    this.board = this.#generateBoard();
    this.liveShip = 0;
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
    if (ship.orientation === 'horizontal') {
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
        this.board[x][y + i].ship = ship;
      }
    } else {
      //Vertical
      //check border
      if (x > 9 || y > 9 || x < 0 || y < 0 || ship.size > 10 - x) return false;

      //check empty cells
      for (let i = 0; i < ship.size; i++) {
        if (this.board[x + i][y].display !== 'O') return false;
      }

      //check neighboring cells
      for (let i = x; i < x + ship.size; i++) {
        //check left col
        //skip for first col
        if (y !== 0) {
          //top left
          if (i !== 0 && this.board[i - 1][y - 1].display !== 'O') return false;
          //low right
          if (i !== 9 && this.board[i + 1][y - 1].display !== 'O') return false;
          //left
          if (this.board[i][y - 1].display !== 'O') return false;
        }

        //check right col
        //skip for last col
        if (y !== 9) {
          //top right
          if (i !== 0 && this.board[i - 1][y + 1].display !== 'O') return false;
          //low right
          if (i !== 9 && this.board[i + 1][y + 1].display !== 'O') return false;
          //right
          if (this.board[i][y + 1].display !== 'O') return false;
        }
      }

      //check top - low
      if (x !== 0 && this.board[x - 1][y].display !== 'O') return false;
      if (x + ship.size < 10 && this.board[x + ship.size][y].display !== 'O') return false;

      for (let i = 0; i < ship.size; i++) {
        this.board[x + i][y].display = 'S';
        this.board[x + i][y].ship = ship;
      }
    }

    this.liveShip += 1;
    return true;
  }

  receiveAttack(x, y) {
    // check border
    if (x > 9 || y > 9 || x < 0 || y < 0) return false;
    // zero living ships
    if (this.liveShip <= 0) return false;

    // miss
    if (this.board[x][y].display === 'O') {
      this.board[x][y].display = 'X';
      return true;
      // hit
    } else if (this.board[x][y].display === 'S') {
      this.board[x][y].display = 'H';
      this.board[x][y].ship.hit();
      // hit around if sunk
      if (this.board[x][y].ship.isSunk()) {
        const shipSize = this.board[x][y].ship.size;
        //for horizontal
        if (this.board[x][y].ship.orientation === 'horizontal') {
          //find start cell ship ( y )
          let start;
          for (let i = 0; i < 10; i++) {
            if (this.board[x][i].ship === this.board[x][y].ship) {
              start = i;
              break;
            }
          }

          for (let i = start; i < start + shipSize; i++) {
            // hit top row
            // skip for first row
            if (x !== 0) {
              //top left
              if (i !== 0 && i === start) this.board[x - 1][i - 1].display = 'X';
              //top right
              if (i !== 9 && i === start + shipSize - 1) this.board[x - 1][i + 1].display = 'X';
              //top
              this.board[x - 1][i].display = 'X';
            }
            // hit low row
            // skip for last row
            if (x !== 9) {
              //low left
              if (i !== 0 && i === start) this.board[x + 1][i - 1].display = 'X';
              // low right
              if (i !== 9 && i === start + shipSize - 1) this.board[x + 1][i + 1].display = 'X';
              //low
              this.board[x + 1][i].display = 'X';
            }
          }

          // hit left-right
          if (start !== 0) this.board[x][start - 1].display = 'X';
          if (start + shipSize < 10) this.board[x][start + shipSize].display = 'X';
        } else {
          // for vertical
          // find start cell ship ( x )
          let start;
          for (let i = 0; i < 10; i++) {
            if (this.board[i][y].ship === this.board[x][y].ship) {
              start = i;
              break;
            }
          }
          for (let i = start; i < start + shipSize; i++) {
            // hit left col
            // skip for first col
            if (y !== 0) {
              //left top
              if (i !== 0 && i === start) this.board[i - 1][y - 1].display = 'X';
              //left bottom
              if (i !== 9 && i === start + shipSize - 1) this.board[i + 1][y - 1].display = 'X';
              // left
              this.board[i][y - 1].display = 'X';
            }
            // hit right col
            // skip for last col
            if (y !== 9) {
              //low left
              if (i !== 0 && i === start) this.board[i - 1][y + 1].display = 'X';
              // low right
              if (i !== 9 && i === start + shipSize - 1) this.board[i + 1][y + 1].display = 'X';
              //low
              this.board[i][y + 1].display = 'X';
            }
            // hit top - bottom
            if (start !== 0) this.board[start - 1][y].display = 'X';
            if (start + shipSize < 10) this.board[start + shipSize][y].display = 'X';
          }
        }
        this.liveShip -= 1;
      }
      return true;
    } else {
      return false;
    }
  }
}

class Player {
  constructor(type, gameboard) {
    this.type = type;
    this.gameboard = gameboard;
  }
}

export { Ship, Gameboard, Player };
