<script>

export default {
  name: 'AlgorithmTester',
  data() {
    return {
      baseArray: [],
      results: {},
      runnersList: this.algorithms,
      rounds: 0,
      failsUtilStop: this.maxFails,
      timeUntilStop: this.maxTime,
    };
  },
  props: {
    algorithms: {
      type: Array,
      required: true,
    },
    maxFails: {
      type: Number,
      default: 5,
    },
    maxTime: {
      type: Number,
      default: 100,
    },
  },
  mounted() {
    if (this.hasRunnersInRace()) {
      this.startRace();
    }
  },
  watch: {
    algorithms(newValue) {
      this.runnersList = newValue;
      this.startRace();
    },
  },
  computed: {
    hasRunnersInRace() {
      return this.runnersList.length > 0;
    },
  },
  methods: {
    startRace() {
      if (this.hasRunnersInRace) {
        this.nextTurn();
      }
    },
    nextTurn() {
      this.baseArray.push(this.random());

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
      return result.time <= this.timeUntilStop;
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
