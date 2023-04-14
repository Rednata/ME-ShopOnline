import { loadArticle } from './modules/fetch.js';
import {showNavigation, showHeaderMenu} from './modules/showNavigation.js';
import { renderMenu } from './modules/fetchCard.js';
import { showCountGoodInCart} from './modules/shopControl.js'

const init = () => {
  loadArticle();
  showNavigation();
  showHeaderMenu();
  renderMenu();
  showCountGoodInCart();
};

init();

