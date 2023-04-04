import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu } from './modules/fetchCard.js';

const init = () => {
  showNavigation();
  showHeaderMenu();
  renderMenu();
};

init();