import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu, renderCatalog } from './modules/fetchCard.js';
import { openCatalogPage } from './modules/openCatalogPage.js';
import { showCountGoodInCart} from './modules/shopControl.js'

const init = () => {
  showNavigation();
  showHeaderMenu();
  renderMenu();
  openCatalogPage();
  renderCatalog();
  showCountGoodInCart();
};

init();
