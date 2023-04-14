import { createCart, createImgCard, createBreadCrumb, createDescript, createElemWithClass, createRecommend } from './createCatalog&Cards.js';

const URL = 'https://determined-painted-hawthorn.glitch.me/api';

const fetchGoods = async (param) => {
  const response = await fetch(URL + param);
  const data = await response.json();
  return data;
};

const createHrefLink = (path, hash) => {
  const url = new URL(document.location);
  url.pathname = path;
  url.hash = hash;
  return url;
};










export { createHrefLink, fetchGoods };
