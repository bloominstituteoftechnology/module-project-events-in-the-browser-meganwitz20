// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()// Record start time
    return currentTime - startTime // Return difference in time
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  } 

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 
        if (!square.classList.contains('targeted')) {
          document.querySelector('.targeted')?.classList.remove('targeted')
          square.classList.add('targeted')
        }
      })
    }
  }

  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    let currentlyTargeted = document.querySelector('.targeted');
    let currentRow = currentlyTargeted.parentElement;
    let currentSquareIndex = Array.from(currentRow.children).indexOf(currentlyTargeted);

    if (evt.key === keys.up) {
      let previousRow = currentRow.previousElementSibling;
      if (previousRow) {
        currentlyTargeted.classList.remove('targeted');
        previousRow.children[currentSquareIndex].classList.add('targeted');
      }
    } else if (evt.key === keys.down) {
      let nextRow = currentRow.nextElementSibling;
      if (nextRow) {
        currentlyTargeted.classList.remove('targeted');
        nextRow.children[currentSquareIndex].classList.add('targeted');
      }
    } else if (evt.key === keys.left) {
      if (currentSquareIndex > 0) {
        currentlyTargeted.classList.remove('targeted');
        currentRow.children[currentSquareIndex - 1].classList.add('targeted');
      }
    } else if (evt.key === keys.right) {
      if (currentSquareIndex < currentRow.children.length - 1) {
        currentlyTargeted.classList.remove('targeted');
        currentRow.children[currentSquareIndex + 1].classList.add('targeted');
      }
    }

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    if (evt.key === keys.space) {
      let currentlyTargeted = document.querySelector('.targeted');
      let mosquito = currentlyTargeted.querySelector('img');

      if (mosquito && mosquito.dataset.status === 'alive') {
        mosquito.dataset.status = 'dead';
        currentlyTargeted.style.backgroundColor = 'red';
        areAllMosquitoesDead();
      }
    }
  });

  // 👉 TASK 5 - End the game 👈
  function areAllMosquitoesDead() {
    let allMosquitoes = document.querySelectorAll('.square img');
    if (Array.from(allMosquitoes).every(mosquito => mosquito.dataset.status === 'dead')) {
      let infoElement = document.querySelector('p.info');
      infoElement.textContent = `Extermination completed in ${getTimeElapsed() / 1000} seconds!`;
    }
  }

  // Add restart button
  let restartBtn = document.createElement('button');
  restartBtn.id = 'restart-btn';
  restartBtn.textContent = 'Restart';
  document.querySelector('header h2').appendChild(restartBtn);

  document.querySelector('#restart-btn').addEventListener('click', () => {
    window.location.reload();
  });

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// 👆 WORK WORK ABOVE THIS LINE 👆

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()