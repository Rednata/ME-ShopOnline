import { loadPosts } from './modules/fetch.js';
import {showNavigation} from './modules/showNavigation.js';

const init = () => {
  loadPosts();
  showNavigation();
};

init();