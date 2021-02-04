const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
scoreDisplay.textContent = score
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))


function startGame() {

    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    score = 0
    scoreDisplay.textContent = score

    direction = 1
    intervalTime = 1000
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add('snake'))

    timerId = setInterval(move, intervalTime)
    
}

function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
        return clearInterval(timerId)

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    //deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow our snake array
        currentSnake.push(tail)
        //generate a new apple
        generateApple()
        //add one to the score
        score++
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        intervalTime *= speed
        timerId = setInterval(move, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

function generateApple() {
    do {
        appleIndex = Math.floor((Math.random() * squares.length))
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApple()

function control(e) {
    switch (e.key) {
        case 'ArrowLeft':
            direction = -1
            break;
        case 'ArrowUp':
            direction = -width
            break;
        case 'ArrowRight':
            direction = 1
            break;
        case 'ArrowDown':
            direction = +width
            break;
    }
}

document.addEventListener('keydown', control)

startButton.addEventListener('click', startGame)

