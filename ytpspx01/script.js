// script.js

document.addEventListener("DOMContentLoaded", function() {
    let timer = document.getElementById("timer");
    let timeLeft = 20;

    function countdown() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "00:00";
        } else {
            timeLeft--;
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    let timerInterval = setInterval(countdown, 1000);
});
