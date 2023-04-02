import { loadPosts } from './modules/fetch.js';
import {showHeaderMenu, showNavigation} from './modules/showNavigation.js';
import { renderMenu } from './modules/fetchCard.js';

const init = () => {
  loadPosts();
  showNavigation();
  showHeaderMenu();
  renderMenu();
};

init();
