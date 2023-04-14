import { loadPosts } from './modules/fetch.js';
import {onClickHeaderBtnMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu } from './modules/render.js';
import { showCountGoodInCart} from './modules/shopControl.js';

const init = () => {
  loadPosts();
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  showCountGoodInCart();
};

init();
