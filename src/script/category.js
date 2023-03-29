import { loadPageCategory, loadCategoryCards} from './modules/fetchCategories.js';
import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';

const init = () => {  
  showNavigation();
  showHeaderMenu();  
  loadPageCategory();
};

init();