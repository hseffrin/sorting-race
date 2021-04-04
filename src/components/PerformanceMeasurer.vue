<template>
  <div class="measurement">
    <div v-for="result in runResults" :key='result.name'>
      <slot :result="lapResult(result)"/>
    </div>
  </div>
</template>

<script>
import { sortPerformance } from '@/sorting/sortPerformance';

export default {
  name: 'PerformanceMeasurer',
  data() {
    return {
      results: {},
      runnersList: this.algorithms,
    };
  },
  props: {
    algorithms: {
      type: Array,
      required: true,
    },
    inputArray: {
      type: Array,
      required: true,
    },
    timeLimit: {
      type: Number,
      default: 100,
    },
  },
  watch: {
    inputArray(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.newLap();
        });
      }
    },
  },
  computed: {
    runResults() {
      return Object.values(this.results);
    },
    hasRunnersInRace() {
      return this.runnersList.length > 0;
    },
  },
  inject: ['updateRunnerList'],
  updated() {
    this.$nextTick(() => {
      this.updateRunnerList(this.runResults);
    });
  },
  methods: {
    newLap() {
      this.runnersList.forEach((algorithm) => {
        const data = this.results[algorithm.name] || this.result(algorithm);
        data.time = sortPerformance(this.inputArray, algorithm.sort);
        const fail = this.testPassed(data) ? 0 : 1;
        data.fails += fail;
        data.size = this.inputArray.length;
        this.$set(this.results, algorithm.name, data);
      });
    },
    testPassed(result) {
      return result.time <= this.timeLimit;
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
    lapResult({
      name, size, fails, time,
    }) {
      return {
        name,
        size,
        fails,
        time,
      };
    },
  },
};
</script>
