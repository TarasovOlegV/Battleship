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

class Gameboard {}

export { Ship, Gameboard };
