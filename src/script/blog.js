import { loadPosts } from './modules/fetch.js';
import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu } from './modules/fetchCard.js';
import { showCountGoodInCart} from './modules/shopControl.js'

const init = () => {
  loadPosts();
  showNavigation();
  showHeaderMenu();
  renderMenu();
  showCountGoodInCart();
};

init();
