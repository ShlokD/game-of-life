require(['game', 'view'], (game, view) => {
	const Game = game.Game;
	const View = view.View;

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
});
