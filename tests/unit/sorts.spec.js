import defaultSort from '@/sorting/defaultSort';
import { inOrder } from '@/sorting/sortPerformance';

const shuffledArray = [2, 4, 6, 7, 3, 9, 1, 5, 8];
const orderedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const reversedArray = [9, 8, 7, 6, 5, 4, 3, 2, 1];

test('test the inOrder function', () => {
  expect(inOrder(shuffledArray)).toBeFalsy();
  expect(inOrder(orderedArray)).toBeTruthy();
  expect(inOrder(reversedArray)).toBeFalsy();
});

describe('default javascript sort', () => {
  test('with unordered array', () => {
    const sorted = defaultSort(shuffledArray);
    expect(inOrder(sorted)).toBeTruthy();
  });

  test('with ordered array', () => {
    const sorted = defaultSort(orderedArray);
    expect(inOrder(sorted)).toBeTruthy();
  });

  test('with reverse order array', () => {
    const sorted = defaultSort(reversedArray);
    expect(inOrder(sorted)).toBeTruthy();
  });
});
