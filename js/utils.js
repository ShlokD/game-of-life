define(() => {
  const cloneArray = (arr) => arr.map((childArr) => childArr.slice());
  return {
    cloneArray
  };
});