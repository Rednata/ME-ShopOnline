import { getTimeInner } from './modules/createElements.js';
import { makeMenu, getCategoryLink } from './modules/fetchCategories.js';
import { getDeadline, timerStart } from './modules/functionTimer.js';
import { showHeaderMenu, showNavigation } from './modules/showNavigation.js';

const initTimer = () => {
  const timeDuration = document.querySelector('[data-timer-deadline]');
  if (timeDuration) {
    getTimeInner(timeDuration);
    const deadline = getDeadline(timeDuration);
    timerStart(deadline);
  }
  makeMenu();
  showNavigation();
  showHeaderMenu();
  getCategoryLink();
};

initTimer();
