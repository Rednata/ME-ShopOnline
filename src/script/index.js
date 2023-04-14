import { getTimeInner } from './modules/createElements.js';
import { getDeadline, timerStart } from './modules/functionTimer.js';
import { onClickHeaderBtnMenu, showNavigation } from './modules/showNavigation.js';
import { renderMenu } from './modules/render.js';
import { showCountGoodInCart} from './modules/shopControl.js';


const initTimer = () => {
  const timeDuration = document.querySelector('[data-timer-deadline]');
  if (timeDuration) {
    getTimeInner(timeDuration);
    const deadline = getDeadline(timeDuration);
    timerStart(deadline);
  }
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  showCountGoodInCart();
};

initTimer();
