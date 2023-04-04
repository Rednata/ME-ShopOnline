import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu, renderPageCard } from './modules/fetchCard.js';
import { shopControl } from './modules/shopControl.js';

const init = async () => {
  showNavigation();
  showHeaderMenu();
  renderMenu();
  const dataGood = await renderPageCard();
  shopControl(dataGood);
};

init();
