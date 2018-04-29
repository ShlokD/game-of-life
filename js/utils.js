define(() => {
	const cloneArray = arr => arr.map(childArr => childArr.slice());
	const flattenArray = arr => [].concat.apply([], arr);
	return {
		cloneArray,
		flattenArray
	};
});
