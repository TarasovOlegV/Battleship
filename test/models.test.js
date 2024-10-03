const { Ship } = require('../src/models.mjs');

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
