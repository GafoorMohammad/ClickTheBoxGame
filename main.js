const box = document.getElementById('box');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const clickSound = document.getElementById('clickSound');
const gameOverSound = document.getElementById('gameOverSound');

let score = 0;
let timeLeft = 30;
let boxSpeed = 1000; // Box movement interval in milliseconds
let timerInterval;
let boxInterval;

// Function to move the box to a random position within the game area
function moveBox() {
    const gameArea = document.getElementById('gameArea');
    const maxX = gameArea.clientWidth - box.clientWidth;
    const maxY = gameArea.clientHeight - box.clientHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    box.style.left = randomX + 'px';
    box.style.top = randomY + 'px';

    // Gradually increase the speed of the box
    clearInterval(boxInterval);
    boxInterval = setInterval(moveBox, boxSpeed);
}

// Function to update the score
function updateScore() {
    score += 1;
    scoreElement.textContent = `Score: ${score}`;
}

// Function to update the timer
function updateTimer() {
    timeLeft -= 1;
    timerElement.textContent = `Time Left: ${timeLeft}`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        clearInterval(boxInterval);
        box.style.display = 'none'; // Hide the box
        gameOverSound.play(); // Play game over sound
        setTimeout(() => {
            alert(`Game Over! Your final score is ${score}`);
            location.reload(); // Reload the page to restart the game
        }, 1000);
    }
}

// Event listener to handle box clicks
box.addEventListener('click', () => {
    updateScore();
    clickSound.play(); // Play click sound
    moveBox();
});

// Start the game
function startGame() {
    moveBox();
    timerInterval = setInterval(updateTimer, 1000);
}

window.onload = startGame;
