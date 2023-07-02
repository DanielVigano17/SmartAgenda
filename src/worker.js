let seconds = 60;
let intervalId = null;

self.onmessage = function worker(event) {
  if (event.data.isActive === 'start') {
    seconds = event.data.seconds;
    startTimer();
  } else if (event.data === 'stop') {
    stopTimer();
  }
};

function startTimer() {
  intervalId = setInterval(() => {
    seconds--;
    self.postMessage(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);

  
}

