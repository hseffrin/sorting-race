<template>
  <div class="home">
    <AlgorithmTesters :algorithms="algorithms">
      <template #default="{algorithms, maxTime, testArray}">
        <PerformanceMeasurer
          :algorithms="algorithms"
          :time-limit="maxTime"
          :input-array="testArray"
        >
          <template #default="{result: { name, size, time, fails }}">
            Algoritmo {{ name }} com array de {{ size }} valores.
            Tempo: {{ time }}
            Falhas: {{fails}}
          </template>
        </PerformanceMeasurer>
      </template>
    </AlgorithmTesters>
  </div>
</template>

<script>
// @ is an alias to /src
import AlgorithmTesters from '@/components/AlgorithmTesters.vue';
import PerformanceMeasurer from '@/components/PerformanceMeasurer.vue';

import defaultSort from '@/sorting/defaultSort';
import bubbleSort from '@/sorting/bubbleSort';

export default {
  name: 'Home',
  components: {
    AlgorithmTesters,
    PerformanceMeasurer,
  },
  data() {
    return {
      algorithms: [
        {
          name: 'JavaScriptDefault',
          sort: defaultSort,
        },
        {
          name: 'BubbleSort',
          sort: bubbleSort,
        },
      ],
    };
  },
};
</script>
