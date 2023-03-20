import { loadArticle } from './modules/fetch.js';
import {showNavigation} from './modules/showNavigation.js';

const init = () => {
  loadArticle();
  showNavigation();
};

init();

