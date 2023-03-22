import { loadArticle } from './modules/fetch.js';
import {showNavigation, showHeaderMenu} from './modules/showNavigation.js';

const init = () => {
  loadArticle();
  showNavigation();
  showHeaderMenu();
};

init();

