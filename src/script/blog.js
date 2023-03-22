import { loadPosts } from './modules/fetch.js';
import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';

const init = () => {
  loadPosts();
  showNavigation();
  showHeaderMenu();
};

init();