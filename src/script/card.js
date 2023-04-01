import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { 
  makeMenu, getCategoryLink, loadPageGood, loadPageCatalog, getGoodLink } from './modules/fetchCategories.js';

const init = () => {
  showNavigation();
  showHeaderMenu();
  makeMenu();
  getCategoryLink();
  getGoodLink();
  loadPageGood();
  // loadPageCatalog()
};

init();
