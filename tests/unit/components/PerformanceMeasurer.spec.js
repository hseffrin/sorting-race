import { mount } from '@vue/test-utils';
import PerformanceMeasurer from '@/components/PerformanceMeasurer.vue';
import defaultSort from '@/sorting/defaultSort';

const sortingAlgoritms = [{
  name: 'Default Sort',
  sort: defaultSort,
}];

const testArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));

let wrapper;

describe('PerformanceMeasurer fail rules', () => {
  beforeAll(() => {
    wrapper = mount(PerformanceMeasurer, {
      propsData: {
        algorithms: sortingAlgoritms,
        inputArray: testArray,
        timeLimit: 0,
      },
      scopedSlots: {
        default: (props) => {
          const testResult = props.result;
          return `${testResult.fails}`;
        },
      },
    });
  });

  test('it must fails with limit of 0 milisecond', () => {
    const fails = wrapper.find('div').text();
    expect(fails).toBe('1');
  });
});
