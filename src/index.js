import { Gameboard, Player, Ship } from './models.mjs';

let gameStarted = false;
let gameFinish = false;

const computerPlayer = new Player('computer', new Gameboard());
computerPlayer.gameboard.addShip(0, 0, new Ship(4, 'horizontal'));
computerPlayer.gameboard.addShip(4, 4, new Ship(2, 'vertical'));

const humanPlayer = new Player('human', new Gameboard());
humanPlayer.gameboard.addShip(2, 2, new Ship(2, 'vertical'));
humanPlayer.gameboard.addShip(6, 6, new Ship(3, 'horizontal'));

const player1 = humanPlayer;
const player2 = computerPlayer;

let currentPlayer = player1;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function computerAttack() {
  if (gameFinish) return;
  if (player1.gameboard.receiveAttack(randomIntFromInterval(0, 9), randomIntFromInterval(0, 9))) {
    renderBoards();
    if (player1.gameboard.liveShip === 0) {
      document.querySelector('.winner').innerText = `Winner - ${player2.type}`;
      return;
    }
    currentPlayer = player1;
    return;
  }
  computerAttack();
}

function createHtmlBoard(gameboard, isHide) {
  const container = document.createElement('div');
  if (isHide) {
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        //cell.innerText = gameboard.board[i][j].display;
        if (gameboard.board[i][j].display === 'H') {
          cell.classList.add('hit');
          cell.innerText = 'X';
        } else if (gameboard.board[i][j].display === 'X') {
          cell.classList.add('miss');
          cell.innerText = 'X';
        } else {
          cell.classList.add('free');
        }
        cell.addEventListener('click', (event) => {
          if (currentPlayer !== player1 || gameFinish) return;
          if (player2.gameboard.receiveAttack(i, j)) {
            renderBoards();
            if (player2.gameboard.liveShip === 0) {
              document.querySelector('.winner').innerText = `Winner - ${player1.type}`;
              return;
            }
            currentPlayer = player2;
            computerAttack();
          }
        });
        row.appendChild(cell);
      }
      container.appendChild(row);
    }
  } else {
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        //cell.innerText = gameboard.board[i][j].display;
        if (gameboard.board[i][j].display === 'O') {
          cell.classList.add('free');
        } else if (gameboard.board[i][j].display === 'H') {
          cell.classList.add('hit');
          cell.innerText = 'X';
        } else if (gameboard.board[i][j].display === 'S') {
          cell.classList.add('ship');
        } else if (gameboard.board[i][j].display === 'X') {
          cell.classList.add('miss');
          cell.innerText = 'X';
        }
        row.appendChild(cell);
      }
      container.appendChild(row);
    }
  }

  return container;
}

function renderBoards() {
  document.querySelector('.first-player-desk').innerHTML = '';
  document.querySelector('.second-player-desk').innerHTML = '';
  document.querySelector('.first-player-desk').appendChild(createHtmlBoard(humanPlayer.gameboard, false));
  document.querySelector('.second-player-desk').appendChild(createHtmlBoard(computerPlayer.gameboard, true));
}

// first render
renderBoards();
