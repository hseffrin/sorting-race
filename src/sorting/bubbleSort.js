const bubbleSort = (toSort, compare) => {
  let swapped = false;
  const list = toSort.slice();
  do {
    swapped = false;
    for (let i = 0; i < list.length; i += 1) {
      if (compare(list[i], list[i + 1]) > 0) {
        swapped = true;
        const temp = list[i + 1];
        list[i + 1] = list[i];
        list[i] = temp;
      }
    }
  } while (swapped);

  return list;
};

const compare = (first, second) => first - second;
const sort = (list) => bubbleSort(list.slice(), compare);

export default sort;
