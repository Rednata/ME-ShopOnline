import { loadPosts } from './modules/fetch.js';
import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { makeMenu, getCategoryLink } from './modules/fetchCategories.js';

const init = () => {
  loadPosts();
  showNavigation();
  showHeaderMenu();
  makeMenu();
  getCategoryLink();
};

init();
