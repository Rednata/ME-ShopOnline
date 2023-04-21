import {onClickHeaderBtnMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu, showCountGoodInCart, renderBenefit } from './modules/render.js';
import {shopControl} from './modules/shopControl.js'
import { renderShopPage } from './modules/render.js';

const init = () => {
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  showCountGoodInCart('shop');
  renderShopPage();
  shopControl();
  renderBenefit();
};

init();
