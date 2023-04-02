import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu, renderPageCard } from './modules/fetchCard.js';

const init = () => {
  showNavigation();
  showHeaderMenu();
  renderMenu();
  renderPageCard();
};

init();
