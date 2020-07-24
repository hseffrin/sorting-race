const sortPerformance = (list, sort) => {
  const beforeSort = performance.now();
  sort(list);
  const afterSort = performance.now();
  return afterSort - beforeSort;
};

const inOrder = (list) => list.every((value, index, array) => !index || array[index - 1] < value);

export { sortPerformance, inOrder };
