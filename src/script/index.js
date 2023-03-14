import { getTimeInner } from './modules/createElements.js';
import { getDeadline, timerStart } from './modules/functionTimer.js';
import { showNavigation } from './modules/showNavigation.js';

const initTimer = () => {
  const timeDuration = document.querySelector('[data-timer-deadline]');  
  if (timeDuration) {
    getTimeInner(timeDuration);
    const deadline = getDeadline(timeDuration);
    timerStart(deadline);
  }
  showNavigation();
};

initTimer();
