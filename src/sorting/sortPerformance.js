const sortPerformance = (list, sort) => {
  const beforeSort = performance.now();
  sort(list);
  const afterSort = performance.now();
  return afterSort - beforeSort;
};

export default sortPerformance;
