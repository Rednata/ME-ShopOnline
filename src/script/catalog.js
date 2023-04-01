import { loadPageCatalog} from './modules/fetchCategories.js';
import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { makeMenu, getCategoryLink } from './modules/fetchCategories.js';

const init = () => {  
  showNavigation();
  showHeaderMenu();  
  loadPageCatalog();
  makeMenu();
  getCategoryLink();  
};

init();