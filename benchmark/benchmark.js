
const generateRandomArray = (size, min, max) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
};

const benchmark = async (algorithm, arr) => {
  console.log(`Starting benchmark for ${algorithm.name}`);
  const start = performance.now();
  await algorithm(arr);
  const end = performance.now();
  const elapsedTime = end - start;
  console.log(`Benchmark completed for ${algorithm.name}: ${elapsedTime} ms`);
  return elapsedTime;
};

const runBenchmark = async (arrSize = 1000, iterations = 10) => {
  const min = 1;
  const max = 10000;
  const results = {};

  for (const algoName in sortingAlgorithms) {
    const algo = sortingAlgorithms[algoName];
    let totalTime = 0;

    for (let i = 0; i < iterations; i++) {
      const arr = generateRandomArray(arrSize, min, max);
      totalTime += await benchmark(algo, [...arr]);
    }

    results[algoName] = totalTime / iterations;
  }

  console.log('Benchmark results:');
  console.table(results);
};

runBenchmark();
