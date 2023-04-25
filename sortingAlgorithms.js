 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 async function swap(arr, i, j) {
  if (stopSorting) return;
  const arraySize = arr.length;
  const speedFactor = Math.max(1, Math.floor(arraySize / 25));
  await new Promise(resolve => setTimeout(resolve, 35 / speedFactor));

  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
 const sortingAlgorithms = {
  async bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (stopSorting) return;
        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
          displayArray(arr);
        }
      }
    }
  },

selectionSort: async function(arr) {
  for (let i = 0; i < arr.length / 2; i++) {
    if (stopSorting) return;

    let minIndex = i;
    let maxIndex = i;

    for (let j = i + 1; j < arr.length - i; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }

      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }

    if (minIndex !== i) {
      await swap(arr, i, minIndex);
      displayArray(arr);
    }
    if (maxIndex === i) {
      maxIndex = minIndex;
    }

    let lastIndex = arr.length - 1 - i;
    if (maxIndex !== lastIndex) {
      await swap(arr, lastIndex, maxIndex);
      displayArray(arr);
    }
  }
},


  
insertionSort: async function (arr, low = 0, high = arr.length - 1) {
  for (let i = low + 1; i <= high; i++) {
    let j = i;
    while (j > low && arr[j - 1] > arr[j]) {
      if (stopSorting) return;
      await swap(arr, j, j - 1);
      displayArray(arr);
      j--;
    }
  }
},


async bogoSort(arr) {
while (!isSorted(arr)) {
if (stopSorting) return;
    for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    await swap(arr, i, j);
  }
  displayArray(arr);
}
},
async quickSort(arr, low = 0, high = arr.length - 1) {
if (low < high) {
if (stopSorting) return;
  const pivotIndex = await partition(arr, low, high);
  await sortingAlgorithms.quickSort(arr, low, pivotIndex - 1);
  await sortingAlgorithms.quickSort(arr, pivotIndex + 1, high);
}
},
 
quicksort3: async function(arr, low = 0, high = arr.length - 1) {
  if (stopSorting) return;

  async function threeWayPartition(arr, low, high) {
    let pivot = arr[high];
    let lt = low;
    let gt = high;
    let i = low;

    while (i <= gt) {
      if (arr[i] < pivot) {
        await swap(arr, i, lt);
        displayArray(arr);
        lt++;
        i++;
      } else if (arr[i] > pivot) {
        await swap(arr, i, gt);
        displayArray(arr);
        gt--;
      } else {
        i++;
      }
    }
    return [lt, gt];
  }

  async function quickSort(arr, low, high) {
    if (low < high) {
      let [lt, gt] = await threeWayPartition(arr, low, high);

      await quickSort(arr, low, lt - 1);
      await quickSort(arr, gt + 1, high);
    }
  }

  await quickSort(arr, low, high);
},


  timSort: async function(arr) {
    const RUN = 32;

    const insertionSortTim = async function(arr, left, right) {
      for (let i = left + 1; i <= right; i++) {
        let j = i;
        while (j > left && arr[j - 1] > arr[j]) {
          if (stopSorting) return;
          await swap(arr, j, j - 1);
          displayArray(arr);
          j--;
        }
      }
    };

    const mergeTim = async function(arr, l, m, r) {
      let len1 = m - l + 1;
      let len2 = r - m;
      let left = new Array(len1);
      let right = new Array(len2);

      for (let i = 0; i < len1; i++) left[i] = arr[l + i];
      for (let i = 0; i < len2; i++) right[i] = arr[m + 1 + i];

      let i = 0;
      let j = 0;
      let k = l;

      while (i < len1 && j < len2) {
        if (stopSorting) return;
        if (left[i] <= right[j]) {
          arr[k] = left[i];
          i++;
        } else {
          arr[k] = right[j];
          j++;
        }
        k++;
        await new Promise(resolve => setTimeout(resolve, 35));
        displayArray(arr);
      }

      while (i < len1) {
        if (stopSorting) return;
        arr[k++] = left[i++];
        await new Promise(resolve => setTimeout(resolve, 35));
        displayArray(arr);
      }

      while (j < len2) {
        if (stopSorting) return;
        arr[k++] = right[j++];
        await new Promise(resolve => setTimeout(resolve, 35));
        displayArray(arr);
      }
    };

    for (let i = 0; i < arr.length; i += RUN) {
      await insertionSortTim(arr, i, Math.min(i + RUN - 1, arr.length - 1));
    }

    for (let size = RUN; size < arr.length; size = 2 * size) {
      for (let left = 0; left < arr.length; left += 2 * size) {
        let mid = left + size - 1;
        let right = Math.min(left + 2 * size - 1, arr.length - 1);

        await mergeTim(arr, left, mid, right);
      }
    }
  },

async mergeSort(arr, low = 0, high = arr.length - 1) {
if (low < high) {
if (stopSorting) return;
  const mid = Math.floor((low + high) / 2);
  await sortingAlgorithms.mergeSort(arr, low, mid);
  await sortingAlgorithms.mergeSort(arr, mid + 1, high);
  await sortingAlgorithms.merge(arr, low, mid, high);
}
},

  
quadSort: async function(arr, low = 0, high = arr.length - 1) {
  if (high - low < 1) return;

  if (stopSorting) return;

  let mid = Math.floor((low + high) / 2);
  await sortingAlgorithms.quadSort(arr, low, mid);
  await sortingAlgorithms.quadSort(arr, mid + 1, high);

  let left = arr.slice(low, mid + 1);
  let right = arr.slice(mid + 1, high + 1);
  let i = 0,
    j = 0,
    k = low;

  while (i < left.length && j < right.length) {
    if (stopSorting) return;
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
    await new Promise(resolve => setTimeout(resolve, 35));
    displayArray(arr);
  }

  while (i < left.length) {
    if (stopSorting) return;
    arr[k++] = left[i++];
    await new Promise(resolve => setTimeout(resolve, 35));
    displayArray(arr);
  }

  while (j < right.length) {
    if (stopSorting) return;
    arr[k++] = right[j++];
    await new Promise(resolve => setTimeout(resolve, 35));
    displayArray(arr);
  }
},
  radixSort: async function(arr) {
  const getMaxDigits = (num) => {
    let maxDigits = 0;
    while (num) {
      num = Math.floor(num / 10);
      maxDigits++;
    }
    return maxDigits;
  };

  const maxNum = Math.max(...arr);
  const maxDigits = getMaxDigits(maxNum);
  let divisor = 1;

  for (let i = 0; i < maxDigits; i++) {
    let buckets = [...Array(10)].map(() => []);

    for (let num of arr) {
      if (stopSorting) return;
      buckets[Math.floor((num % (divisor * 10)) / divisor)].push(num);
    }

    arr = [].concat.apply([], buckets);
    displayArray(arr);
    await new Promise(resolve => setTimeout(resolve, 35));

    divisor *= 10;
  }
},
radixhoodSort: async function(arr) {
  const getMaxDigits = (num) => {
    let maxDigits = 0;
    while (num) {
      num = Math.floor(num / 10);
      maxDigits++;
    }
    return maxDigits;
  };

  const maxNum = Math.max(...arr);
  const maxDigits = getMaxDigits(maxNum);
  let divisor = 1;

  const maxIndex = arr.indexOf(maxNum);
  await swap(arr, maxIndex, arr.length - 1);
  displayArray(arr);

  for (let i = 0; i < maxDigits; i++) {
    let buckets = [...Array(10)].map(() => []);

    for (let num of arr) {
      if (stopSorting) return;
      buckets[Math.floor((num % (divisor * 10)) / divisor)].push(num);
    }

    let currentBucket = 0;
    let totalSwaps = 0;

    for (let j = 0; j < arr.length - 1; j++) { 
      if (stopSorting) return;

      while (buckets[currentBucket].length === 0) {
        currentBucket++;
      }

      let target = buckets[currentBucket][0];
      let targetIndex = arr.indexOf(target);

      for (let k = j + 1; k < arr.length; k++) {
        if (arr[k] === target) {
          targetIndex = k;
          break;
        }
      }

      if (targetIndex !== j) {
        await swap(arr, j, targetIndex);
        displayArray(arr);
        totalSwaps++;
      }

      buckets[currentBucket].shift();
    }

    if (totalSwaps === 0) {
      break;
    }

    divisor *= 10;
  }
},




oddEvenSort: async function(arr) {
  let sorted = false;

  while (!sorted) {
    sorted = true;

    for (let i = 1; i < arr.length - 1; i += 2) {
      if (stopSorting) return;
      if (arr[i] > arr[i + 1]) {
        await swap(arr, i, i + 1);
        displayArray(arr);
        sorted = false;
      }
    }

    for (let i = 0; i < arr.length - 1; i += 2) {
      if (stopSorting) return;
      if (arr[i] > arr[i + 1]) {
        await swap(arr, i, i + 1);
        displayArray(arr);
        sorted = false;
      }
    }
  }
},
  gnomeSort: async function(arr) {
  let pos = 0;
  while (pos < arr.length) {
    if (stopSorting) return;
    if (pos === 0 || arr[pos] >= arr[pos - 1]) {
      pos++;
    } else {
      [arr[pos], arr[pos - 1]] = [arr[pos - 1], arr[pos]];
      displayArray(arr);
      await new Promise(resolve => setTimeout(resolve, 35));
      pos--;
    }
  }
},
shakerSort: async function(arr) {
  let swapped;
  do {
    if (stopSorting) return;
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        displayArray(arr);
        await new Promise(resolve => setTimeout(resolve, 35));
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
    swapped = false;
    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i] < arr[i - 1]) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        displayArray(arr);
        await new Promise(resolve => setTimeout(resolve, 35));
        swapped = true;
      }
    }
  } while (swapped);
},

shellSort: async function(arr) {
  let gap = Math.floor(arr.length / 2);
  while (gap > 0) {
    if (stopSorting) return;
    for (let i = gap; i < arr.length; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
        displayArray(arr);
        await new Promise(resolve => setTimeout(resolve, 35));
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
},
robinHoodSort: async function(arr) {
  let swaps, midIndex;
  let arrayLength = arr.length;

  do {
    swaps = 0;
    for (let i = 1; i < arrayLength; i++) {
      if (stopSorting) return;
      if (arr[i - 1] > arr[i]) {
        await swap(arr, i - 1, i);
        displayArray(arr);
        swaps++;
      }
    }

    if (swaps === 0) break;

    arrayLength--;

    for (let i = arrayLength - 1; i > 0; i--) {
      if (stopSorting) return;
      if (arr[i - 1] > arr[i]) {
        await swap(arr, i - 1, i);
        displayArray(arr);
        swaps++;
      }
    }

    midIndex = Math.floor(arrayLength / 2);
    if (arr[midIndex] > arr[midIndex + 1]) {
      await swap(arr, midIndex, midIndex + 1);
      displayArray(arr);
      swaps++;
    }
  } while (swaps > 0);
},
robinhood3Sort: async function(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return;
  if (stopSorting) return;

  let pivotIndex = Math.floor((low + high) / 2);
  const pivot = arr[pivotIndex];
  let left = low;
  let right = high;
  let i = low;
  while (i <= right) {
    if (stopSorting) return;
    if (arr[i] < pivot) {
      await swap(arr, i, left);
      displayArray(arr);
      left++;
      i++;
    } else if (arr[i] > pivot) {
      await swap(arr, i, right);
      displayArray(arr);
      right--;
    } else {
      i++;
    }
  }
  await sortingAlgorithms.robinhood3Sort(arr, low, left - 1);
  await sortingAlgorithms.robinhood3Sort(arr, right + 1, high);
},

combSort: async function(arr) {
  const shrinkFactor = 1.3;
  let gap = arr.length;
  let swapped = true;

  while (gap > 1 || swapped) {
    if (stopSorting) return;
    gap = Math.floor(gap / shrinkFactor);
    if (gap < 1) {
      gap = 1;
    }
    swapped = false;
    for (let i = 0; i + gap < arr.length; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        displayArray(arr);
        await new Promise(resolve => setTimeout(resolve, 35));
        swapped = true;
      }
    }
  }
},


merge: async function(arr, low, mid, high) {
const n1 = mid - low + 1;
const n2 = high - mid;
let left = new Array(n1);
let right = new Array(n2);

for (let i = 0; i < n1; i++) left[i] = arr[low + i];
for (let i = 0; i < n2; i++) right[i] = arr[mid + 1 + i];

let i = 0,
  j = 0,
  k = low;

while (i < n1 && j < n2) {
  if (stopSorting) return;
  if (left[i] <= right[j]) {
    arr[k] = left[i];
    i++;
  } else {
    arr[k] = right[j];
    j++;
  }
  k++;
  await new Promise(resolve => setTimeout(resolve, 35));
  displayArray(arr);
}

while (i < n1) {
  if (stopSorting) return;
  arr[k] = left[i];
  i++;
  k++;
  await new Promise(resolve => setTimeout(resolve, 35));
  displayArray(arr);
}

while (j < n2) {
  if (stopSorting) return;
  arr[k] = right[j];
  j++;
  k++;
  await new Promise(resolve => setTimeout(resolve, 35));
  displayArray(arr);
}
},

  slowSort: async function(arr, i = 0, j = arr.length - 1) {
  if (i >= j) return;
  if (stopSorting) return;

  let m = Math.floor((i + j) / 2);
  await sortingAlgorithms.slowSort(arr, i, m);
  await sortingAlgorithms.slowSort(arr, m + 1, j);

  if (arr[j] < arr[m]) {
    await swap(arr, j, m);
    displayArray(arr);
  }

  await sortingAlgorithms.slowSort(arr, i, j - 1);
},

async spaghettiSort(arr) {
  let n = arr.length;
  let maxValue = arr[0];
  for (let i = 1; i < n; i++) {
    if (stopSorting) return;
    if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }

  let count = new Array(maxValue + 1).fill(0);

  for (let i = 0; i < n; i++) {
    if (stopSorting) return;
    count[arr[i]]++;
  }

  let index = 0;
  for (let i = 0; i < count.length; i++) {
    for (let j = 0; j < count[i]; j++) {
      if (stopSorting) return;
      arr[index++] = i;
      displayArray(arr);
      await sleep(5);
    }
  }
},

};
 async function partition(arr, low, high) {
const pivot = arr[high];
let i = low - 1;

for (let j = low; j <= high - 1; j++) {
if (stopSorting) return;
  if (arr[j] < pivot) {
  i++;
   await swap(arr, i, j);
  displayArray(arr);
}
}
await swap(arr, i + 1, high);
displayArray(arr);
return i + 1;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sortingAlgorithms;
}
window.sleep = sleep;
window.swap = swap;
window.sortingAlgorithms = sortingAlgorithms;
window.partion = partition;
