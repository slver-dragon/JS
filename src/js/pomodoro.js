let timerBlock = document.getElementById("timer");
let setupMenu = document.querySelector(".setup-menu");
let workTime = document.querySelector(".work-time");
let reposeTime = document.querySelector(".repose-time");
let countRepeat = document.querySelector(".count-repeat");
/*let periodCurrent = 0;*/
let periodWork = 0;
let periodRepose = 0;
let cycles = 0;
let modeWork = true;
let halt = false;

function startPomodoro(period) {
  timer = setInterval(function () {
    hours = Math.floor((period / 60 / 60) % 60);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = Math.floor((period / 60) % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = Math.floor(period % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (period < 0) {
      if (!modeWork) {
        if (cycles <= 1) {
          clearInterval(timer);
          timerBlock.className = "timer-end";
          timeResult = "Время вышло";
          cycles = 0;
          changeSound();
        }
        else {
          period = periodWork;
          timerBlock.classList.toggle("repose");
          --cycles;
          modeWork = !modeWork;
          changeSound();
        }
      }
      else {
        period = periodRepose;
        timerBlock.classList.toggle("repose");
        modeWork = !modeWork;
        changeSound();
      }
      console.log(periodWork,periodRepose,cycles);
    }
    else {
      timeResult = hours + ":" + minutes + ":" + seconds;
    }
    timerBlock.innerHTML = timeResult;
    --period;
    if (halt) {
      halt = false;
      clearInterval(timer);
      timerBlock.innerHTML = '';
    }
  }, 1000);  
}

workTime.onfocus = function () {
  workTime.classList.remove("error");
};

reposeTime.onfocus = function () {
  reposeTime.classList.remove("error");
};

countRepeat.onfocus = function () {
  countRepeat.classList.remove("error");
};

document.querySelector(".start").addEventListener("click", function () {
  
  if (isNaN(setupMenu.querySelectorAll("input")[0])&&periodWork == '') {
    workTime.classList.add("error");
    setupMenu.classList.remove("hider");
    halt = true;
  }

  if (isNaN(setupMenu.querySelectorAll("input")[1])&&periodRepose == '') {
    reposeTime.classList.add("error");
    setupMenu.classList.remove("hider");
    halt = true;
  }

  if (isNaN(setupMenu.querySelectorAll("input")[2])&&cycles == '0') {
    countRepeat.classList.add("error");
    setupMenu.classList.remove("hider");
    halt = true;
  }

  if (halt) {
    halt = false;
    return;
  }

  if (cycles == 0) {
    refillData();}
  timerBlock.innerHTML = '';
  timerBlock.className = "timer";
  /*if (periodCurrent <= 0) {*/
    startPomodoro(periodWork);/*}
  else {
    startPomodoro(periodCurrent)
  }*/
});

document.querySelector(".stop").addEventListener("click", function () {
  /*periodCurrent = 0;*/
  cycles = 0;
  halt = true;
});

document.querySelector(".setup").addEventListener("click", function () {
    setupMenu.classList.toggle("hider");
});

document.querySelector(".confirm").addEventListener("click", function () {
  refillData();
});

function refillData() {
    time = setupMenu.querySelectorAll("input")[0].value.split(":",3);
    periodWork = +time[0] * 3600 + +time[1] * 60 + +time[2];
    time = setupMenu.querySelectorAll("input")[1].value.split(":",3);
    periodRepose = +time[0] * 3600 + +time[1] * 60 + +time[2];
    cycles = +setupMenu.querySelectorAll("input")[2].value;
}

document.querySelector(".reject").addEventListener("click", function () {
    setupMenu.querySelectorAll("input")[0].value = '';
    setupMenu.querySelectorAll("input")[1].value = '';
    setupMenu.querySelectorAll("input")[2].value = '';
});

function changeSound() {
  audio = new Audio();
  audio.src = 'sound/bell.mp3';
  audio.autoplay = true;
}