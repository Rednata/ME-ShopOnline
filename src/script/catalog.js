import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu, renderCatalog } from './modules/fetchCard.js';

const init = () => {
  showNavigation();
  showHeaderMenu();
  renderMenu();
  renderCatalog();
};

init();