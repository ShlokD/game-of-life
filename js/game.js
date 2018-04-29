define(require => {
	const utils = require('./utils');

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

	return { Game };
});
