const { Ship, Gameboard } = require('../src/models.mjs');

describe('Ship', () => {
  const ship2 = new Ship(2, 'horizontal');
  const ship3 = new Ship(3, 'horizontal');
  const ship4 = new Ship(1, 'vertical');

  test('init test', () => {
    expect(ship2.size).toBe(2);
    expect(ship3.size).toBe(3);
    expect(ship2.hits).toBe(0);
    expect(ship4.size).toBe(1);
    expect(ship4.hits).toBe(0);
    expect(ship2.isSunk()).toBeFalsy();
  });

  test('hit func', () => {
    ship2.hit();
    expect(ship2.hits).toBe(1);
  });

  test('sunk after hits', () => {
    ship2.hit();
    expect(ship2.hits).toBe(2);
    expect(ship2.isSunk()).toBeTruthy();
  });

  test('no more hits after sunk', () => {
    ship2.hit();
    expect(ship2.hits).toBe(2);
  });
});

describe('Gameboard', () => {
  const transformBoardForTest = (gameboard) => gameboard.board.map((row) => row.map((cell) => cell.display));

  test('empty board', () => {
    const testGameboard = new Gameboard();

    expect(transformBoardForTest(testGameboard)).toEqual([
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ]);
  });

  describe('addShip func', () => {
    describe('positive add', () => {
      test('add to center', () => {
        const testGameboard = new Gameboard();

        expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);

        expect(testGameboard.addShip(1, 1, new Ship(4, 'vertical'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'S', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);
      });

      test('add to first cell', () => {
        const testGameboard = new Gameboard();
        const testGameboard2 = new Gameboard();

        expect(testGameboard.addShip(0, 0, new Ship(1, 'horizontal'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard)).toEqual([
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);

        expect(testGameboard.addShip(3, 0, new Ship(4, 'horizontal'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard)).toEqual([
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'S', 'S', 'S', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);

        expect(testGameboard.addShip(9, 0, new Ship(1, 'horizontal'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard)).toEqual([
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'S', 'S', 'S', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);

        expect(testGameboard2.addShip(0, 0, new Ship(1, 'vertical'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard2)).toEqual([
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);

        expect(testGameboard2.addShip(3, 0, new Ship(4, 'vertical'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard2)).toEqual([
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);

        expect(testGameboard2.addShip(8, 0, new Ship(2, 'vertical'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard2)).toEqual([
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);
      });

      test('add to last cell', () => {
        const testGameboard = new Gameboard();
        const testGameboard2 = new Gameboard();

        expect(testGameboard.addShip(9, 8, new Ship(2, 'horizontal')));
        expect(transformBoardForTest(testGameboard)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'S', 'S'],
        ]);

        expect(testGameboard.addShip(0, 9, new Ship(1, 'horizontal'))).toBeTruthy();

        expect(transformBoardForTest(testGameboard)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'S'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'S', 'S'],
        ]);

        expect(testGameboard2.addShip(8, 9, new Ship(2, 'vertical')));
        expect(transformBoardForTest(testGameboard2)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'S'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'S'],
        ]);

        expect(testGameboard2.addShip(0, 9, new Ship(1, 'vertical')));
        expect(transformBoardForTest(testGameboard2)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'S'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'S'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'S'],
        ]);
      });
    });

    test('out of range', () => {
      const testGameboard = new Gameboard();
      const testGameboard2 = new Gameboard();

      expect(testGameboard.addShip(-1, 4, new Ship(4, 'horizontal'))).toBeFalsy();
      expect(testGameboard.addShip(11, 4, new Ship(4, 'horizontal'))).toBeFalsy();
      expect(testGameboard.addShip(4, -1, new Ship(4, 'horizontal'))).toBeFalsy();
      expect(testGameboard.addShip(4, 11, new Ship(4, 'horizontal'))).toBeFalsy();
      expect(transformBoardForTest(testGameboard)).toEqual([
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);

      expect(testGameboard2.addShip(-1, 4, new Ship(4, 'vertical'))).toBeFalsy();
      expect(testGameboard2.addShip(11, 4, new Ship(4, 'vertical'))).toBeFalsy();
      expect(testGameboard2.addShip(4, -1, new Ship(4, 'vertical'))).toBeFalsy();
      expect(testGameboard2.addShip(4, 11, new Ship(4, 'vertical'))).toBeFalsy();
      expect(transformBoardForTest(testGameboard2)).toEqual([
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);
    });

    test('check free cell', () => {
      const testGameboard = new Gameboard();
      const testGameboard2 = new Gameboard();

      expect(testGameboard.addShip(0, 0, new Ship(2, 'horizontal'))).toBeTruthy();
      expect(testGameboard.addShip(0, 0, new Ship(2, 'horizontal'))).toBeFalsy();
      expect(testGameboard.addShip(0, 1, new Ship(2, 'horizontal'))).toBeFalsy();

      expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
      expect(testGameboard.addShip(4, 2, new Ship(3, 'horizontal'))).toBeFalsy();

      expect(transformBoardForTest(testGameboard)).toEqual([
        ['S', 'S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);

      expect(testGameboard2.addShip(0, 0, new Ship(2, 'vertical'))).toBeTruthy();
      expect(testGameboard2.addShip(0, 0, new Ship(2, 'vertical'))).toBeFalsy();
      expect(testGameboard2.addShip(1, 0, new Ship(2, 'vertical'))).toBeFalsy();

      expect(testGameboard2.addShip(4, 4, new Ship(4, 'vertical'))).toBeTruthy();
      expect(testGameboard2.addShip(6, 4, new Ship(3, 'vertical'))).toBeFalsy();

      expect(transformBoardForTest(testGameboard2)).toEqual([
        ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);
    });

    describe('check free neighboring cell', () => {
      test('positive add with neighbors', () => {
        const testGameboard = new Gameboard();
        const testGameboard2 = new Gameboard();

        expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
        expect(testGameboard.addShip(4, 0, new Ship(3, 'horizontal'))).toBeTruthy();
        expect(testGameboard.addShip(4, 9, new Ship(1, 'horizontal'))).toBeTruthy();
        expect(testGameboard.addShip(2, 4, new Ship(4, 'horizontal'))).toBeTruthy();
        expect(testGameboard.addShip(6, 4, new Ship(4, 'horizontal'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['S', 'S', 'S', 'O', 'S', 'S', 'S', 'S', 'O', 'S'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);

        expect(testGameboard2.addShip(4, 4, new Ship(4, 'vertical'))).toBeTruthy();
        expect(testGameboard2.addShip(2, 4, new Ship(1, 'vertical'))).toBeTruthy();
        expect(testGameboard2.addShip(9, 4, new Ship(1, 'vertical'))).toBeTruthy();
        expect(testGameboard2.addShip(3, 2, new Ship(2, 'vertical'))).toBeTruthy();
        expect(testGameboard2.addShip(6, 2, new Ship(3, 'vertical'))).toBeTruthy();
        expect(testGameboard2.addShip(3, 6, new Ship(2, 'vertical'))).toBeTruthy();
        expect(testGameboard2.addShip(6, 6, new Ship(3, 'vertical'))).toBeTruthy();
        expect(transformBoardForTest(testGameboard2)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'S', 'O', 'O', 'O', 'S', 'O', 'O', 'O'],
          ['O', 'O', 'S', 'O', 'S', 'O', 'S', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'S', 'O', 'S', 'O', 'S', 'O', 'O', 'O'],
          ['O', 'O', 'S', 'O', 'S', 'O', 'S', 'O', 'O', 'O'],
          ['O', 'O', 'S', 'O', 'O', 'O', 'S', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
        ]);
      });

      test('left neighbor', () => {
        const testGameboard = new Gameboard();
        const testGameboard2 = new Gameboard();
        expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
        expect(testGameboard.addShip(4, 8, new Ship(2, 'horizontal'))).toBeFalsy();

        expect(transformBoardForTest(testGameboard)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);

        expect(testGameboard2.addShip(4, 4, new Ship(4, 'vertical'))).toBeTruthy();
        expect(testGameboard2.addShip(4, 3, new Ship(2, 'vertical'))).toBeFalsy();

        expect(transformBoardForTest(testGameboard2)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);
      });

      test('right neighbor', () => {
        const testGameboard = new Gameboard();
        const testGameboard2 = new Gameboard();

        expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
        expect(testGameboard.addShip(4, 2, new Ship(2, 'horizontal'))).toBeFalsy();
        expect(transformBoardForTest(testGameboard)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);

        expect(testGameboard2.addShip(4, 4, new Ship(4, 'vertical'))).toBeTruthy();
        expect(testGameboard2.addShip(4, 5, new Ship(2, 'vertical'))).toBeFalsy();

        expect(transformBoardForTest(testGameboard2)).toEqual([
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ]);
      });

      describe('upper neighbor', () => {
        test('upper left neighbor', () => {
          const testGameboard = new Gameboard();
          const testGameboard2 = new Gameboard();

          expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
          expect(testGameboard.addShip(3, 3, new Ship(2, 'horizontal'))).toBeFalsy();
          expect(transformBoardForTest(testGameboard)).toEqual([
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ]);

          expect(testGameboard2.addShip(4, 4, new Ship(4, 'vertical'))).toBeTruthy();
          expect(testGameboard2.addShip(3, 4, new Ship(1, 'vertical'))).toBeFalsy();

          expect(transformBoardForTest(testGameboard2)).toEqual([
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ]);
        });

        test('upper center neighbor', () => {
          const testGameboard = new Gameboard();
          expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
          expect(testGameboard.addShip(3, 4, new Ship(2, 'horizontal'))).toBeFalsy();
          expect(transformBoardForTest(testGameboard)).toEqual([
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ]);
        });

        test('upper right neighbor', () => {
          const testGameboard = new Gameboard();
          expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
          expect(testGameboard.addShip(3, 8, new Ship(2, 'horizontal'))).toBeFalsy();
          expect(transformBoardForTest(testGameboard)).toEqual([
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ]);
        });
      });

      describe('lower neighbor', () => {
        test('lower left neighbor', () => {
          const testGameboard = new Gameboard();
          const testGameboard2 = new Gameboard();

          expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
          expect(testGameboard.addShip(5, 3, new Ship(2, 'horizontal'))).toBeFalsy();
          expect(transformBoardForTest(testGameboard)).toEqual([
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ]);

          expect(testGameboard2.addShip(4, 4, new Ship(4, 'vertical'))).toBeTruthy();
          expect(testGameboard2.addShip(8, 4, new Ship(1, 'vertical'))).toBeFalsy();

          expect(transformBoardForTest(testGameboard2)).toEqual([
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ]);
        });

        test('lower center neighbor', () => {
          const testGameboard = new Gameboard();
          expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
          expect(testGameboard.addShip(5, 4, new Ship(2, 'horizontal'))).toBeFalsy();
          expect(transformBoardForTest(testGameboard)).toEqual([
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ]);
        });

        test('lower right neighbor', () => {
          const testGameboard = new Gameboard();
          expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
          expect(testGameboard.addShip(5, 8, new Ship(2, 'horizontal'))).toBeFalsy();
          expect(transformBoardForTest(testGameboard)).toEqual([
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ]);
        });
      });
    });
  });

  describe('receiveAttack func', () => {
    test('miss', () => {
      const testGameboard = new Gameboard();
      expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();
      expect(testGameboard.receiveAttack(0, 0)).toBeTruthy();
      expect(testGameboard.receiveAttack(9, 9)).toBeTruthy();
      expect(testGameboard.receiveAttack(3, 3)).toBeTruthy();
      expect(testGameboard.receiveAttack(3, 4)).toBeTruthy();
      expect(testGameboard.receiveAttack(3, 8)).toBeTruthy();
      expect(testGameboard.receiveAttack(4, 3)).toBeTruthy();
      expect(testGameboard.receiveAttack(4, 8)).toBeTruthy();
      expect(testGameboard.receiveAttack(5, 3)).toBeTruthy();
      expect(testGameboard.receiveAttack(5, 4)).toBeTruthy();

      expect(transformBoardForTest(testGameboard)).toEqual([
        ['X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'O'],
        ['O', 'O', 'O', 'X', 'S', 'S', 'S', 'S', 'X', 'O'],
        ['O', 'O', 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X'],
      ]);
    });

    test('out of range', () => {
      const testGameboard = new Gameboard();

      expect(testGameboard.receiveAttack(-1, 4)).toBeFalsy();
      expect(testGameboard.receiveAttack(11, 4)).toBeFalsy();
      expect(testGameboard.receiveAttack(4, -1)).toBeFalsy();
      expect(testGameboard.receiveAttack(4, 11)).toBeFalsy();
      expect(transformBoardForTest(testGameboard)).toEqual([
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);
    });

    test('hit the ship', () => {
      const testGameboard = new Gameboard();
      const testGameboard2 = new Gameboard();
      const testGameboard3 = new Gameboard();
      expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();

      expect(testGameboard.receiveAttack(4, 3)).toBeTruthy();
      expect(testGameboard.receiveAttack(4, 4)).toBeTruthy();
      expect(testGameboard.receiveAttack(4, 5)).toBeTruthy();
      expect(testGameboard.receiveAttack(4, 6)).toBeTruthy();
      expect(transformBoardForTest(testGameboard)).toEqual([
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'X', 'H', 'H', 'H', 'S', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);

      expect(testGameboard.receiveAttack(4, 7)).toBeTruthy();
      expect(transformBoardForTest(testGameboard)).toEqual([
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'O'],
        ['O', 'O', 'O', 'X', 'H', 'H', 'H', 'H', 'X', 'O'],
        ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);

      expect(testGameboard2.addShip(1, 1, new Ship(3, 'vertical'))).toBeTruthy();
      expect(testGameboard2.receiveAttack(1, 1)).toBeTruthy();
      expect(testGameboard2.receiveAttack(2, 1)).toBeTruthy();
      expect(transformBoardForTest(testGameboard2)).toEqual([
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'H', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'H', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);

      expect(testGameboard2.receiveAttack(3, 1)).toBeTruthy();
      expect(transformBoardForTest(testGameboard2)).toEqual([
        ['X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['X', 'H', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['X', 'H', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['X', 'H', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);

      expect(testGameboard3.addShip(0, 0, new Ship(1, 'vertical'))).toBeTruthy();
      expect(testGameboard3.addShip(3, 3, new Ship(4, 'horizontal'))).toBeTruthy();
      expect(testGameboard3.addShip(5, 5, new Ship(4, 'vertical'))).toBeTruthy();
      expect(testGameboard3.addShip(8, 9, new Ship(2, 'vertical'))).toBeTruthy();

      expect(transformBoardForTest(testGameboard3)).toEqual([
        ['S', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'S', 'S', 'S', 'S', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'S', 'O', 'O', 'O', 'S'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'S'],
      ]);

      expect(testGameboard3.receiveAttack(0, 0)).toBeTruthy();
      expect(testGameboard3.receiveAttack(3, 3)).toBeTruthy();
      expect(testGameboard3.receiveAttack(3, 4)).toBeTruthy();
      expect(testGameboard3.receiveAttack(3, 5)).toBeTruthy();
      expect(testGameboard3.receiveAttack(3, 6)).toBeTruthy();
      expect(testGameboard3.receiveAttack(5, 5)).toBeTruthy();
      expect(testGameboard3.receiveAttack(6, 5)).toBeTruthy();
      expect(testGameboard3.receiveAttack(7, 5)).toBeTruthy();
      expect(testGameboard3.receiveAttack(8, 5)).toBeTruthy();
      expect(testGameboard3.receiveAttack(8, 9)).toBeTruthy();
      expect(testGameboard3.receiveAttack(9, 9)).toBeTruthy();

      expect(transformBoardForTest(testGameboard3)).toEqual([
        ['H', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O'],
        ['O', 'O', 'X', 'H', 'H', 'H', 'H', 'X', 'O', 'O'],
        ['O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'X', 'H', 'X', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'X', 'H', 'X', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'X', 'H', 'X', 'O', 'X', 'X'],
        ['O', 'O', 'O', 'O', 'X', 'H', 'X', 'O', 'X', 'H'],
        ['O', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'X', 'H'],
      ]);

      // attack after end game
      expect(testGameboard3.receiveAttack(0, 9)).toBeFalsy();
    });

    test('attack with zero living ship', () => {
      const testGameboard = new Gameboard();
      expect(testGameboard.addShip(4, 4, new Ship(4, 'horizontal'))).toBeTruthy();

      expect(testGameboard.receiveAttack(4, 3)).toBeTruthy();
      expect(testGameboard.receiveAttack(4, 4)).toBeTruthy();
      expect(testGameboard.receiveAttack(4, 5)).toBeTruthy();
      expect(testGameboard.receiveAttack(4, 6)).toBeTruthy();
      expect(transformBoardForTest(testGameboard)).toEqual([
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'X', 'H', 'H', 'H', 'S', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);

      expect(testGameboard.receiveAttack(4, 7)).toBeTruthy();
      expect(transformBoardForTest(testGameboard)).toEqual([
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'O'],
        ['O', 'O', 'O', 'X', 'H', 'H', 'H', 'H', 'X', 'O'],
        ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);

      expect(testGameboard.receiveAttack(0, 0)).toBeFalsy();
      expect(transformBoardForTest(testGameboard)).toEqual([
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'O'],
        ['O', 'O', 'O', 'X', 'H', 'H', 'H', 'H', 'X', 'O'],
        ['O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ]);
    });
  });
});
