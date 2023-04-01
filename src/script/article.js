import { loadArticle } from './modules/fetch.js';
import {showNavigation, showHeaderMenu} from './modules/showNavigation.js';
import { makeMenu, getCategoryLink } from './modules/fetchCategories.js';

const init = () => {
  loadArticle();
  showNavigation();
  showHeaderMenu();
  makeMenu();
  getCategoryLink();
};

init();

