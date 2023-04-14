import {onClickHeaderBtnMenu, showNavigation} from './modules/showNavigation.js';
import { renderPageCard } from './modules/render.js';
import { renderMenu } from './modules/render.js';
import { openCardPage, openCatalogPage } from './modules/openWindow.js';
import { addGoodInCart, showCountGoodInCart} from './modules/shopControl.js'

const init = async () => {
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  const dataGood = await renderPageCard();
  addGoodInCart(dataGood);
  // openCatalogPage();
  // openCardPage();
  showCountGoodInCart();
};

init();
