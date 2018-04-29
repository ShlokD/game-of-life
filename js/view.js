define(require => {
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

	return {
		View
	};
});
