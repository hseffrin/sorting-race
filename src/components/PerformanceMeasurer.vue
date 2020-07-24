<template>
  <div class="measurement">
    <div v-for="result in runResults" :key='result.name'>
      Algoritmo {{ result.name }} com array de {{ result.size }} valores.
      Tempo: {{ result.time }}
      Falhas: {{result.fails}}
    </div>
  </div>
</template>

<script>
import { sortPerformance } from '@/sorting/sortPerformance';

export default {
  name: 'PerformanceMeasurer',
  data() {
    return {
      baseArray: [],
      results: {},
      runnersList: this.algorithms,
      rounds: 0,
      failsUtilStop: 5,
      maxTime: 1,
    };
  },
  props: {
    algorithms: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.newLap();
  },
  computed: {
    runResults() {
      return Object.values(this.results);
    },
    hasRunnersInRace() {
      return this.runnersList.length > 0;
    },
  },
  methods: {
    newLap() {
      if (this.hasRunnersInRace) {
        this.nextTurn();
      }
    },
    nextTurn() {
      this.baseArray.push(this.random());
      this.runnersList.forEach((algorithm) => {
        const data = this.results[algorithm.name] || this.result(algorithm);
        debugger;
        data.time = sortPerformance(this.baseArray, algorithm.sort);
        const fail = this.testPassed(data) ? 0 : 1;
        data.fails += fail;
        data.size = this.baseArray.length;
        this.$set(this.results, algorithm.name, data);
      });

      this.runnersList = this.runnersList.filter((algorithm) => {
        const testResult = this.results[algorithm.name];
        return this.canContinueTest(testResult);
      });

      setTimeout(() => this.newLap(), 50);
    },
    random() {
      const min = Number.MIN_SAFE_INTEGER;
      const max = Number.MAX_SAFE_INTEGER;
      return Math.floor(Math.random() * (max - min)) + min;
    },
    canContinueTest(currentAlgorithim) {
      return currentAlgorithim.fails <= this.failsUtilStop;
    },
    testPassed(result) {
      return result.time <= this.maxTime;
    },
    result(algorithm) {
      return {
        algorithm: algorithm.sort,
        fails: 0,
        name: algorithm.name,
        time: 0,
        size: 0,
      };
    },
  },
};
</script>
