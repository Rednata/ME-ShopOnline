import {onClickHeaderBtnMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu } from './modules/render.js';
import{renderShopPage, shopControl, showCountGoodInCart} from './modules/shopControl.js'

const init = () => {
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();  
  shopControl();
  // showCountGoodInCart();
  // renderShopPage();
};

init();