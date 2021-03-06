window.onload = function () {
  audio = document.querySelector('audio');

  // progressbar.js@1.0.0 version is used
  // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
  var Timer = function(duration) {
    return new ProgressBar.Circle(container, {
      strokeWidth: 3.2,
      easing: 'linear',
      duration: duration,
      color: '#E91E63',
      trailColor: '#FCE4EC',
      trailWidth: 1.2,
      svgStyle: null,
      text: {
        value: '25:00',
        style: {
          color: '#fff',
          position: 'absolute',
          'font-size': '2em',
          left: '50%',
          top: '50%',
          padding: 0,
          margin: 0,
          transform: {
              prefix: true,
              value: 'translate(-50%, -50%)'
          }
        }
      }
    });
  }

  // Variable declartion
  let pause = true;
  let workTime = 25;
  let breakTime = 5;
  let minutes = workTime;
  let seconds = 0;
  let interval = null; // interval ID of setInterval function
  let timer = Timer(minutes*1000*60);

  // DOM elements
  let titleDOM = document.getElementById('title');
  let breakDOM = document.getElementById('break_time');
  let workDOM = document.getElementById('work_time');
  count = function() {
    if(minutes == 0 && seconds == 1) {
      audio.play();
    }
    if(minutes == 0 && seconds == 0) {
      if(titleDOM.innerText == "Session") {
        titleDOM.innerText = "Break";
        minutes = breakTime;
        newTimer();
        timer.animate(1.0);
      } else {
        titleDOM.innerText = "Session";
        minutes = workTime;
        newTimer();
        timer.animate(1.0);
      }
    }
    else {
      if(seconds == 0) {
        seconds = 60;
        minutes--;
      }
    seconds--;
    }
    updateDisplay();
  }

  function updateDisplay() {
    timer.setText(getTimerText());
  }

  // returns text for timer after converting minutes and seconds
  // in double digits
  function getTimerText() {
  let result = '';
  if(minutes.toString().length === 1)
    result = '0' + minutes;
  else
    result = minutes;
  result += ':';
  if(seconds.toString().length === 1)
    result += '0' + seconds;
  else
    result += seconds;
  return result;
  }

  // Setting up Event Listeners
  document.querySelector('.b_plus').onclick = function() {
  if(pause) {
    breakTime++;
    resetTimer();
    breakDOM.innerText = breakTime;
    updateDisplay();
  }
  }
  document.querySelector('.b_minus').onclick = function() {
  if(breakTime>1 && pause) {
    breakTime--;
    resetTimer();
    breakDOM.innerText = breakTime;
    updateDisplay();
  }
  }
  document.querySelector('.w_plus').onclick = function() {
  if(pause) {
    workTime++;
    resetTimer();
    workDOM.innerText = workTime;
    updateDisplay();
  }
  }
  document.querySelector('.w_minus').onclick = function() {
  if(workTime>1 && pause) {
    workTime--;
    resetTimer();
    workDOM.innerText = workTime;
    updateDisplay();
  }
  }

  document.getElementById('container').onclick = function() {
  if(pause) {
    interval = setInterval(count,1000);
    timer.animate(1.0);  // Number from 0.0 to 1.0)
    pause = false;
  } else {
    clearInterval(interval);
    timer.stop();
    pause = true;
  }
  }

  function resetTimer() {
  minutes = workTime;
  seconds = 0;
  newTimer();
  console.log('timer duration' + timer.duration);
  }

  function newTimer() {
  timer.destroy();
  timer = Timer(minutes*1000*60);
  }
}