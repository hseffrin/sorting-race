<template>
  <div class="home">
    <PerformanceMeasurer :algorithms="algorithms">
      <template #default="{result: { name, size, time, fails }}">
        Algoritmo {{ name }} com array de {{ size }} valores.
        Tempo: {{ time }}
        Falhas: {{fails}}
      </template>
    </PerformanceMeasurer>
  </div>
</template>

<script>
// @ is an alias to /src
import PerformanceMeasurer from '@/components/PerformanceMeasurer.vue';

import defaultSort from '@/sorting/defaultSort';

export default {
  name: 'Home',
  components: {
    PerformanceMeasurer,
  },
  data() {
    return {
      algorithms: [
        {
          name: 'JavaScriptDefault',
          sort: defaultSort,
        },
      ],
    };
  },
};
</script>
