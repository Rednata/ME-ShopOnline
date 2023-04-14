import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu, renderPageCard } from './modules/fetchCard.js';
import { openCardPage, openCatalogPage } from './modules/openCatalogPage.js';
import { addGoodInCart, showCountGoodInCart} from './modules/shopControl.js'

const init = async () => {
  showNavigation();
  showHeaderMenu();
  renderMenu();
  const dataGood = await renderPageCard();
  addGoodInCart(dataGood);
  openCatalogPage();
  openCardPage();
  showCountGoodInCart();
};

init();
