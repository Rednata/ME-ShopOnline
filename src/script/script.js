// import { getTimeInner } from './modules/createElements.js';
// import { getDeadline, timerStart } from './modules/functionTimer.js';

const getNameDays = (days) => {
  if (days % 10 === 1 && days !== 11) {
    return 'день';
  } else if ((days % 10 === 2 ||
                days % 10 === 3 ||
                days % 10 === 4) &&
                (days <= 5 || days >= 20)) {
    return 'дня';
  } else {
    return 'дней';
  }
};

const getNameHours = (hours) => {
  if (hours === 1 ||
      hours === 21) {
    return 'час';
  } else if ((hours >= 5 && hours <= 20) ||
              hours % 10 === 0) {
    return 'часов';
  } else {
    return 'часа';
  }
};

const getNameMinutes = (minutes) => {
  if (minutes % 10 === 1 &&
      minutes !== 11) {
    return 'минута';
  } else if ((minutes % 10 === 2 ||
                  minutes % 10 === 3 ||
                  minutes % 10 === 4) &&
                (minutes <= 5 || minutes >= 20)) {
    return 'минуты';
  } else {
    return 'минут';
  }
};

const getNameSeconds = (seconds) => {
  if (seconds % 10 === 1 &&
      seconds !== 11) {
    return 'секунда';
  } else if ((seconds % 10 === 2 ||
                  seconds % 10 === 3 ||
                  seconds % 10 === 4) &&
                (seconds <= 5 || seconds >= 20)) {
    return 'секунды';
  } else {
    return 'секунд';
  }
};

const getTimeInner = (timeDuration) => {
  timeDuration.insertAdjacentHTML('afterbegin',
      ` <p class="time__title">
      До конца акции:
    </p>
    <div class="time__duration">
      <div class="time__show time__show_days">
        <p class="time__digital digital__day"></p>
      <p class="time__alpha alpha__day"></p>
      </div>
      <div class="time__show time__show_hours">
        <p class="time__digital digital__hour"></p>
        <p class="time__alpha alpha__hour"></p>
      </div>
      <div class="time__show time__show_minutes">
        <p class="time__digital digital__minute"></p>
        <p class="time__alpha alpha__minute"></p>
      </div>
      <div class="time__show time__show_seconds">
        <p class="time__digital digital__second"></p><p class="time__alpha alpha__second"></p>
      </div>                        
    </div> `,
  );
  return timeDuration;
};


const getDeadline = (timeDuration) =>
  new Date(timeDuration.dataset.timerDeadline).getTime();


const getTimeRemaining = (timeRemaining) => {
  const seconds = Math.trunc(timeRemaining % 60);
  const minutes = Math.trunc(timeRemaining / 60 % 60);
  const hours = Math.trunc(timeRemaining / 60 / 60 % 24);
  const days = Math.trunc(timeRemaining / 60 / 60 / 24);

  return { seconds, minutes, hours, days };
};

const isShowDaysOrSeconds = (timeRemaining) => {
  const timeShowSeconds = document.querySelector('.time__show_seconds');
  const timeShowDays = document.querySelector('.time__show_days');

  if ( timeRemaining <= (24 * 60 * 60) ) {
    timeShowDays.classList.add('display_invisible');
    timeShowSeconds.classList.remove('display_invisible');
  } else {
    timeShowDays.classList.remove('display_invisible');
    timeShowSeconds.classList.add('display_invisible');
  }
};

const isTimerFinished = (timeRemaining, setIntervalId) => {
  if (timeRemaining <= 0) {
    const bannerTime = document.querySelector('.banner__time');
    clearInterval(setIntervalId);
    bannerTime.classList.add('display_invisible');
  }
};

const timerStart = (deadline) => {  
  const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const digitalDay = document.querySelector('.digital__day');
  const digitalHour = document.querySelector('.digital__hour');
  const digitalMinute = document.querySelector('.digital__minute');
  const digitalSecond = document.querySelector('.digital__second');
  const alphaDay = document.querySelector('.alpha__day');
  const alphaHour = document.querySelector('.alpha__hour');
  const alphaMinute = document.querySelector('.alpha__minute');
  const alphaSecond = document.querySelector('.alpha__second');

  const setIntervalId = setInterval(() => {
    const now = Date.now() + timeZoneOffset;
    const timeRemaining = (deadline - now) / 1000;
    const timer = getTimeRemaining(timeRemaining);
    const { seconds, minutes, hours, days } = timer;

    alphaDay.textContent = getNameDays(days);
    alphaHour.textContent = getNameHours(hours);
    alphaMinute.textContent = getNameMinutes(minutes);
    alphaSecond.textContent = getNameSeconds(seconds);

    digitalDay.textContent = String(days).padStart(2, '0');
    digitalHour.textContent = String(hours).padStart(2, '0') ;
    digitalMinute.textContent = String(minutes).padStart(2, '0');
    digitalSecond.textContent = String(seconds).padStart(2, '0');

    isShowDaysOrSeconds(timeRemaining);
    isTimerFinished(timeRemaining, setIntervalId);
  }, 1000);
};

const initTimer = () => {
  const timeDuration = document.querySelector('[data-timer-deadline]');  
  if (timeDuration) {
    getTimeInner(timeDuration);
    const deadline = getDeadline(timeDuration);
    timerStart(deadline);
  }
};

initTimer();
