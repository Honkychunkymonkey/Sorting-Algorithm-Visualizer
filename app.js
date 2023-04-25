const arraySize = document.getElementById('arraySize');
const randomize = document.getElementById('randomize');
const algorithm = document.getElementById('algorithm');
const sortBtn = document.getElementById('sort');
const stopSortBtn = document.getElementById('stopSort');
const visualization = document.querySelector('.visualization');

let array = [];
let stopSorting = false;

function generateArray(size) {
  const arr = Array.from({ length: size }, (_, i) => Math.floor((i / size) * 100) + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function displayArray(arr) {
  visualization.innerHTML = '';

  arr.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 2}px`;

    const hue = (index / arr.length) * 360;
    bar.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

    visualization.appendChild(bar);
  });
}

function arraySizeChanged() {
  let arraySizeInput = document.getElementById('arraySizeInput');
  let newSize = arraySizeInput.value;
}
function initArraySize() {
  let arraySizeInput = document.getElementById('arraySizeInput');


}

window.onload = function() {
  initArraySize();
};

function randomizeArray() {
  const size = parseInt(arraySize.value, 10);
  array = generateArray(size);
  displayArray(array);
  stopSortBtn.disabled = true;
}

randomize.addEventListener('click', randomizeArray);

async function sortArray() {
  sortBtn.disabled = true;
  randomize.disabled = true;
  stopSortBtn.disabled = false; // Enable the stop button when starting the sort
  stopSorting = false;

  if (isSorted(array)) {
    randomizeArray();
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const selectedAlgorithm = sortingAlgorithms[algorithm.value];
  if (selectedAlgorithm) {
    await selectedAlgorithm(array);
  } else {
    console.error(`Unknown sorting algorithm: ${algorithm.value}`);
  }
  
  stopSortBtn.disabled = true; // Disable the stop button when the sorting is done or stopped
  sortBtn.disabled = false;
  randomize.disabled = false;
}

sortBtn.addEventListener('click', sortArray);
stopSortBtn.addEventListener('click', () => {
  stopSorting = true;
});


function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (stopSorting) return false;
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}



function populateAlgorithmDropdown() {
  const algorithmNames = Object.keys(sortingAlgorithms);
  algorithmNames.forEach((algorithmName) => {
    if (algorithmName === 'merge') {
      return;
    }
    const option = document.createElement('option');
    option.value = algorithmName;
    option.textContent = formatAlgorithmName(algorithmName);
    algorithm.appendChild(option);
  });
}

function formatAlgorithmName(name) {
  if (name === 'merge') {
    return 'Merge Sort';
  }
  
  return name
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

populateAlgorithmDropdown();

randomizeArray();