import {onClickHeaderBtnMenu, showNavigation} from './modules/showNavigation.js';
import { renderPageCard } from './modules/render.js';
import { renderMenu, showCountGoodInCart } from './modules/render.js';
import { onClickAddInCartBtn } from './modules/shopControl.js';

const init = async () => {
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  await renderPageCard();
  onClickAddInCartBtn();
  showCountGoodInCart();
};

init();
