let startTime;
let running = false;
let interval;
let laps = [];
let lapId = 1;

function start() {
  if (!running) {
    running = true;
    startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1].time : 0);
    interval = setInterval(updateDisplay, 10);
  }
}

function pause() {
  running = false;
  clearInterval(interval);
}

function reset() {
  running = false;
  clearInterval(interval);
  document.querySelector('.display').textContent = '00:00:00';
  laps = [];
  lapId = 1;
  updateLaps();
}

function lap() {
  if (running) {
    const lapTime = Date.now() - startTime;
    laps.push({ id: lapId++, time: lapTime });
    updateLaps();
  }
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  const formattedTime = formatTime(currentTime);
  document.querySelector('.display').textContent = formattedTime;
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateLaps() {
  const lapsList = document.querySelector('.laps');
  lapsList.innerHTML = '';
  laps.forEach(lap => {
    const li = document.createElement('li');
    li.textContent = `Lap ${lap.id}: ${formatTime(lap.time)}`;
    lapsList.appendChild(li);
  });
}
