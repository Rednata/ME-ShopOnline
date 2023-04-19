import {onClickHeaderBtnMenu, showNavigation} from './modules/showNavigation.js';
import { renderCatalog } from './modules/render.js';
import { renderMenu } from './modules/render.js';
import { openCatalogPage } from './modules/openWindow.js';
import { showCountGoodInCart} from './modules/render.js'

const init = () => {
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  openCatalogPage();
  renderCatalog();
  showCountGoodInCart();
};

init();
