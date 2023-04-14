import { createTitle, createCatalog, createCart, createImgCard, createBreadCrumb, createDescript, createElemWithClass, createRecommend } from './createCatalog&Cards.js';


const fetchGoods = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const createHrefLink = (path, hash) => {
  const url = new URL(document.location);
  url.pathname = path;
  url.hash = hash;
  return url;
};

const createMenuItem = (item) => {
  const liItem = document.createElement('li');
  liItem.className = 'sublist__item';

  const link = document.createElement('a');
  link.className = 'sublist__link';
  link.textContent = item;
  liItem.append(link);
  link.href = `/catalog.html#${item}`;
  link.target = '_blank';

  return liItem;
};

const renderMenu = async () => {
  const url = 'https://determined-painted-hawthorn.glitch.me/api/category';
  const categoriesData = await fetchGoods(url);
  const catalogeHeader = document.querySelector('.header .sublist_catalog');
  const catalogeFooter = document.querySelector('.footer .sublist_catalog');

  const dataLiHeader = categoriesData.map(item => createMenuItem(item));
  const dataLiFooter = categoriesData.map(item => createMenuItem(item));

  catalogeHeader.append(...dataLiHeader);
  catalogeFooter.append(...dataLiFooter);
};

const getHashFromURL = () => {
  const url = decodeURI(document.location.hash);
  return url.slice(1);
};


const renderCatalog = async () => {
  const catalogName = getHashFromURL();
  console.log('catalogName: ', catalogName);

  const title = createTitle('catalog__title', catalogName);
  const url = `https://determined-painted-hawthorn.glitch.me/api/goods/category/${catalogName}`;
  const catalogDate = await fetchGoods(url);
  console.log(catalogDate);
  const catalog = createCatalog(catalogDate);

  const sectionCatalog = document.querySelector('.catalog__container');
  sectionCatalog.append(title, catalog);
};

const renderPageCard = async () => {
  const [category, goodID] = getHashFromURL().split('#');
  createBreadCrumb(category);
  const url = `https://determined-painted-hawthorn.glitch.me/api/goods/${goodID}`;

  const dataGood = await fetchGoods(url);
  const title = createTitle('good-card__title', dataGood.title);
  const cart = createCart(dataGood);
  const img = createImgCard(dataGood);

  const wrapCard = createElemWithClass('div', 'good-card__wrap');
  wrapCard.append(img, cart);

  const {title: titleDescript, content} = createDescript(dataGood);

  const urlCatalog = `https://determined-painted-hawthorn.glitch.me/api/goods/category/${dataGood.category}`;
  const dataRecommend = await fetchGoods(urlCatalog);

  const cardContainer = document.querySelector('.good-card');
  cardContainer.append(title, wrapCard, titleDescript, content);

  const recomContainer = document.querySelector('.recommend');
  const {titleRecom, wrapRecom} = createRecommend(dataRecommend);
  recomContainer.append(titleRecom, wrapRecom);

  return dataGood;
};

export { renderMenu, renderCatalog, renderPageCard, createHrefLink, fetchGoods, getHashFromURL };
