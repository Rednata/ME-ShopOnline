import { loadArticle } from './modules/fetch.js';
import {showNavigation, onClickHeaderBtnMenu} from './modules/showNavigation.js';
import { renderMenu } from './modules/render.js';
import { showCountGoodInCart} from './modules/shopControl.js';

const init = () => {
  loadArticle();
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  showCountGoodInCart();
};

init();

