// import {
//   getNameDays,
//   getNameHours,
//   getNameMinutes,
//   getNameSeconds } from './getNames.js';

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

// export { getDeadline, timerStart };
