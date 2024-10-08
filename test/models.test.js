const { Ship, Gameboard } = require('../src/models.mjs');

describe('Ship', () => {
  const ship2 = new Ship(2);
  const ship3 = new Ship(3);

  test('init test', () => {
    expect(ship2.size).toBe(2);
    expect(ship3.size).toBe(3);
    expect(ship2.hits).toBe(0);
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

        expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
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

      test('add to first cell', () => {
        const testGameboard = new Gameboard();

        expect(testGameboard.addShip(0, 0, new Ship(1))).toBeTruthy();
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

        expect(testGameboard.addShip(3, 0, new Ship(4))).toBeTruthy();
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

        expect(testGameboard.addShip(9, 0, new Ship(1))).toBeTruthy();
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
      });

      test('add to last cell', () => {
        const testGameboard = new Gameboard();

        expect(testGameboard.addShip(9, 8, new Ship(2)));
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

        expect(testGameboard.addShip(0, 9, new Ship(1))).toBeTruthy();

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
      });
    });

    test('out of range', () => {
      const testGameboard = new Gameboard();

      expect(testGameboard.addShip(-1, 4, new Ship(4))).toBeFalsy();
      expect(testGameboard.addShip(11, 4, new Ship(4))).toBeFalsy();
      expect(testGameboard.addShip(4, -1, new Ship(4))).toBeFalsy();
      expect(testGameboard.addShip(4, 11, new Ship(4))).toBeFalsy();
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

    test('check free cell', () => {
      const testGameboard = new Gameboard();

      expect(testGameboard.addShip(0, 0, new Ship(2))).toBeTruthy();
      expect(testGameboard.addShip(0, 0, new Ship(2))).toBeFalsy();
      expect(testGameboard.addShip(0, 1, new Ship(2))).toBeFalsy();

      expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
      expect(testGameboard.addShip(4, 2, new Ship(3))).toBeFalsy();

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
    });

    describe('check free neighboring cell', () => {
      test('positive add with neighbors', () => {
        const testGameboard = new Gameboard();
        expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
        expect(testGameboard.addShip(4, 0, new Ship(3))).toBeTruthy();
        expect(testGameboard.addShip(4, 9, new Ship(1))).toBeTruthy();
        expect(testGameboard.addShip(2, 4, new Ship(4))).toBeTruthy();
        expect(testGameboard.addShip(6, 4, new Ship(4))).toBeTruthy();
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
      });

      test('left neighbor', () => {
        const testGameboard = new Gameboard();
        expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
        expect(testGameboard.addShip(4, 8, new Ship(2))).toBeFalsy();

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

      test('right neighbor', () => {
        const testGameboard = new Gameboard();
        expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
        expect(testGameboard.addShip(4, 2, new Ship(2))).toBeFalsy();
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

      describe('upper neighbor', () => {
        test('upper left neighbor', () => {
          const testGameboard = new Gameboard();
          expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
          expect(testGameboard.addShip(3, 3, new Ship(2))).toBeFalsy();
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

        test('upper center neighbor', () => {
          const testGameboard = new Gameboard();
          expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
          expect(testGameboard.addShip(3, 4, new Ship(2))).toBeFalsy();
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
          expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
          expect(testGameboard.addShip(3, 8, new Ship(2))).toBeFalsy();
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
          expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
          expect(testGameboard.addShip(5, 3, new Ship(2))).toBeFalsy();
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

        test('lower center neighbor', () => {
          const testGameboard = new Gameboard();
          expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
          expect(testGameboard.addShip(5, 4, new Ship(2))).toBeFalsy();
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
          expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
          expect(testGameboard.addShip(5, 8, new Ship(2))).toBeFalsy();
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
      expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();
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
      expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();

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
    });

    test('attack with zero living ship', () => {
      const testGameboard = new Gameboard();
      expect(testGameboard.addShip(4, 4, new Ship(4))).toBeTruthy();

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
