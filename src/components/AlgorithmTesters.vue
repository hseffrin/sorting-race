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
    if (this.hasRunnersInRace) {
      this.startRace();
    }
  },
  watch: {
    algorithms(newValue) {
      this.runnersList = newValue;
      this.startRace();
    },
    runnersList() {
      setImmediate(() => {
        this.nextTurn();
      });
    },
  },
  computed: {
    hasRunnersInRace() {
      return this.runnersList.length > 0;
    },
  },
  provide() {
    return {
      updateRunnerList: this.updateRunnerList,
    };
  },
  methods: {
    startRace() {
      if (this.hasRunnersInRace) {
        this.runnersList = this.runnersList.map((algorithm) => ({
          ...algorithm,
          fails: 0,
          time: 0,
        }));
      }
    },
    nextTurn() {
      this.baseArray.push(this.random());
      this.runnersList = this.runnersList.filter((algorithm) => this.canContinueTest(algorithm));
    },
    random() {
      const min = Number.MIN_SAFE_INTEGER;
      const max = Number.MAX_SAFE_INTEGER;
      return Math.floor(Math.random() * (max - min)) + min;
    },
    canContinueTest(currentAlgorithim) {
      return currentAlgorithim.fails <= this.failsUtilStop;
    },
    updateRunnerList(list) {
      this.runnersList = list;
    },
  },
  render() {
    return this.$scopedSlots.default({
      algorithms: this.runnersList,
      testArray: this.baseArray,
      maxTime: this.maxTime,
    });
  },
};
</script>
