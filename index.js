const gameContainer = document.querySelector(".game-container");
const music = document.getElementById("bgMusic");
const pump = document.getElementById("pump");
const handel = document.getElementById("handel");
const startButton = document.getElementById("start-btn");
const backButton = document.getElementById("back-btn");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");
const startDisplay = document.getElementById("start-display");
let blastCount = 0; //blast counts
// let gameOver = false;
highScore.innerText = localStorage.getItem("highscore");

startButton.addEventListener("click", () => {
  startDisplay.style.display = "none";
  gameContainer.style.display = "flex";
  music.play();
});

backButton.addEventListener("click", () => {
  localStorage.setItem("highscore", blastCount);
  startDisplay.style.display = "flex";
  gameContainer.style.display = "none";
  highScore.innerText = localStorage.getItem("highscore");
  music.pause();
});

function addThread(balloon) {
  let thread = document.createElement("div");
  thread.classList.add("thread");
  balloon.appendChild(thread);
}

function gameOver() {
  let userConfirmed = confirm(
    "Game Over! You missed a balloon. Click OK to reload the game."
  );
  if (userConfirmed) {
    let lastHighScore = localStorage.getItem("highscore");

    if (lastHighScore < blastCount) {
      localStorage.setItem("highscore", blastCount);
    }
    location.reload();
  }
}
function createBalloon() {
  handel.classList.add("pump-up-down");
  let randNum = Math.floor(Math.random() * 9) + 1;
  let randAlpha = Math.floor(Math.random() * 26) + 1;
  let alphabet = randAlpha.toString().padStart(2, "0");
  console.log(randNum);
  let balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.backgroundImage = `url("./assets/Symbol 10000${randNum}.png")`;
  const alpha = document.createElement("img");
  alpha.classList.add("alpha");
  balloon.appendChild(alpha);
  alpha.src = `./assets/Symbol 100${alphabet}.png`;

  gameContainer.appendChild(balloon);

  let balloonSize = 50;
  let isFlying = false;

  pump.addEventListener("click", function inflateBalloon() {
    if (!isFlying) {
      balloonSize += 20; // ballon me hawa bhara
      balloon.style.width = balloonSize + "px";
      balloon.style.height = balloonSize * 1.4 + "px";
      balloon.style.marginRight = "-15px";
      balloon.style.bottom = "135px";

      if (balloonSize >= 100) {
        alpha.style.display = "block";

        isFlying = true;
        addThread(balloon);

        flyBalloon(balloon);
        pump.removeEventListener("click", inflateBalloon);
        createBalloon();
      }
    }
  });

  balloon.addEventListener("click", function () {
    // let threadd = document.getElementsByClassName("thread");
    blastCount++;
    score.innerText = blastCount;
    alpha.style.display = "none";
    // threadd.style.display = "none";
    console.log(`Ballons blast: ${blastCount}`);
    balloon.style.backgroundColor = "transparent";
    balloon.style.border = "2px solid red";
    balloon.style.width = "0px";
    balloon.style.height = "0px";
    setTimeout(() => {
      balloon.remove();
    }, 500);
  });
  setInterval(() => {
    handel.classList.remove("pump-up-down");
  }, 50);
}

function flyBalloon(balloon) {
  let randMove = Math.floor(Math.random() * 9) + 1;

  let interval = setInterval(() => {
    let randomX = Math.random() * 15 + randMove; // Move left
    let curretLeft = parseFloat(getComputedStyle(balloon).right);
    let newLeft = curretLeft + randomX;

    let currentTop = parseFloat(getComputedStyle(balloon).top);
    let newTop = currentTop - 5; // Move upwards

    balloon.style.right = newLeft + "px";
    balloon.style.top = newTop + "px";

    if (newTop < -balloon.offsetHeight || newLeft > window.innerWidth) {
      balloon.remove();
      gameOver();
    }
  }, 100);
}

createBalloon();
