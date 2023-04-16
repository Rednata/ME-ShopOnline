import {onClickHeaderBtnMenu, showNavigation} from './modules/showNavigation.js';
import { renderPageCard } from './modules/render.js';
import { renderMenu, showCountGoodInCart } from './modules/render.js';
import { openCardPage, openCatalogPage } from './modules/openWindow.js';
// import { addGoodInCart } from './modules/shopControl.js'
import { onClickAddInCartBtn } from './modules/shopControl.js';

const init = async () => {
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  const dataGood = await renderPageCard();
  // addGoodInCart();
  // addGoodInCart(dataGood);
  // openCatalogPage();
  // openCardPage();
  onClickAddInCartBtn();
  showCountGoodInCart();
};

init();
