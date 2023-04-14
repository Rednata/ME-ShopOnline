import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu } from './modules/fetchCard.js';
import{renderShopPage, shopControl, showCountGoodInCart} from './modules/shopControl.js'

const init = () => {
  showNavigation();
  showHeaderMenu();
  renderMenu();  
  shopControl();
  // showCountGoodInCart();
  // renderShopPage();
};

init();