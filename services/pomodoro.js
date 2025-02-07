let timer;
let totalSeconds = 25 * 60; // 25 minutes
let remainingSeconds = totalSeconds;
let isRunning = false;
const timerDisplay = document.getElementById("timer-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");
const sand = document.getElementById("sand");

function updateTimerDisplay() {
  let minutes = Math.floor(remainingSeconds / 60);
  let seconds = remainingSeconds % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startPauseBtn.textContent = "Pause";

    sand.style.animation = `sand-fall ${remainingSeconds}s linear forwards`;

    timer = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        startPauseBtn.textContent = "Start";
      }
    }, 1000);
  } else {
    isRunning = false;
    startPauseBtn.textContent = "Start";
    clearInterval(timer);
    sand.style.animationPlayState = "paused"; // Pause animation
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
  startPauseBtn.textContent = "Start";
  sand.style.animation = "none"; // Reset animation
  void sand.offsetWidth; // Restart animation
  sand.style.animation = `sand-fall ${totalSeconds}s linear forwards`;
}

startPauseBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
updateTimerDisplay();
