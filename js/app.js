const cloneArray = arr => arr.map(childArr => childArr.slice());
const flattenArray = arr => [].concat.apply([], arr);
const utils = {
  cloneArray,
  flattenArray
};
/* Game Model*/

class Game {
  constructor(initState) {
    this.prevState = [];
    this.currentState = initState;
    this.getNeighbours = this.getNeighbours.bind(this);
    this.calculateNext = this.calculateNext.bind(this);
    this.setCell = this.setCell.bind(this);
  }

  getNeighbours(row, col) {
    const currentRow = this.prevState[row] || [];
    const prevRow = this.prevState[row - 1] || [];
    const nextRow = this.prevState[row + 1] || [];
    const neighbourArray = [
      [prevRow[col - 1], prevRow[col], prevRow[col + 1]],
      [currentRow[col - 1], 0, currentRow[col + 1]],
      [nextRow[col - 1], nextRow[col], nextRow[col + 1]]
    ];

    return utils
      .flattenArray(neighbourArray)
      .reduce((acc, elem) => (acc += +!!elem), 0);
  }

  calculateNext() {
    const next = [];
    for (let row = 0; row < this.prevState.length; ++row) {
      next[row] = [];
      for (let col = 0; col < this.prevState[row].length; ++col) {
        const neighbours = this.getNeighbours(row, col);
        if (neighbours === 3 && this.prevState[row][col] === 0) {
          next[row][col] = 1;
        } else if (neighbours < 2 || neighbours > 3) {
          next[row][col] = 0;
        } else {
          next[row][col] = this.prevState[row][col];
        }
      }
    }

    return next;
  }

  next() {
    this.prevState = utils.cloneArray(this.currentState);
    this.currentState = this.calculateNext();
  }

  print() {
    console.log(this.currentState);
  }

  setCell(x, y, val) {
    this.currentState[x][y] = +val;
  }

  getBoard() {
    return this.currentState;
  }
}

/* Game View*/

class View {
  constructor() {
    this.board = [];
    this.size = 8;
  }

  init() {
    const content = document.querySelector('#content');
    for (let i = 0; i < this.size; ++i) {
      this.board[i] = [];
      const row = document.createElement('tr');
      const rowFragment = new DocumentFragment();
      for (let j = 0; j < this.size; ++j) {
        this.board[i][j] = 0;
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('data-row', i);
        checkbox.setAttribute('data-col', j);
        rowFragment.appendChild(checkbox);
      }
      row.appendChild(rowFragment);
      content.appendChild(row);
    }
  }

  getBoard() {
    return this.board;
  }

  setBoard(board, checkboxes) {
    for (let i = 0; i < board.length; ++i) {
      for (let j = 0; j < board[i].length; ++j) {
        const selectedCheckbox = checkboxes.find(
          checkbox => checkbox.dataset.row == i && checkbox.dataset.col == j
        );
        selectedCheckbox.checked = !!board[i][j];
      }
    }
  }
}


/* Game controller*/ 
const boardView = new View();
boardView.init();

const gameBoard = boardView.getBoard();
const currentGame = new Game(gameBoard);

const checkboxes = [].slice.call(
  document.querySelectorAll('input[type=checkbox]')
);

const nextButton = document.querySelector('#next');

const onCheckboxChange = ev => {
  const x = ev.target.dataset.row;
  const y = ev.target.dataset.col;
  currentGame.setCell(x, y, !!ev.target.checked);
};

const onNext = ev => {
  currentGame.next();
  const currentBoard = currentGame.getBoard();
  currentGame.print();
  boardView.setBoard(currentBoard, checkboxes);
};

checkboxes.forEach(checkbox =>
  checkbox.addEventListener('change', onCheckboxChange)
);
nextButton.addEventListener('click', onNext);
