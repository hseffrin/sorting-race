import { shallowMount } from '@vue/test-utils';
import PerformanceMeasurer from '@/components/PerformanceMeasurer.vue';
import defaultSort from '@/sorting/defaultSort';

const sortingAlgoritms = [{
  name: 'Default Sort',
  sort: defaultSort,
}];

let wrapper;

describe('PerformanceMeasurer rules', () => {
  beforeAll(() => {
    wrapper = shallowMount(PerformanceMeasurer, {
      propsData: {
        algorithms: sortingAlgoritms,
      },
      scopedSlots: {
        default: (props) => {
          const testResult = props.result;
          return `<div>${testResult.size}</div>`;
        },
      },
    });
  });

  test('it must stop after 1 second', () => {
    const text = wrapper.find('div').text();
    expect(text).toBe('1');
  });
});
