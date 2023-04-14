import { fetchGoods } from './fetchCard.js';
import {createMenuItem, createCatalog, createCard, createDescript} from './createElements.js';
import { getHashFromURL } from './commonFunction.js';

const renderMenu = async () => {
  const urlParam = '/category';
  const categoriesData = await fetchGoods(urlParam);
  const catalogeHeader = document.querySelector('.header .sublist_catalog');
  const catalogeFooter = document.querySelector('.footer .sublist_catalog');

  const dataLiHeader = categoriesData.map(item => createMenuItem(item));
  const dataLiFooter = categoriesData.map(item => createMenuItem(item));

  catalogeHeader.append(...dataLiHeader);
  catalogeFooter.append(...dataLiFooter);
};

const renderCatalog = async () => {
  const catalogName = getHashFromURL();
  const urlParam = `/goods/category/${catalogName}`;
  const catalogDate = await fetchGoods(urlParam);

  const {list, title} = createCatalog(catalogDate, catalogName);

  const sectionCatalog = document.querySelector('.catalog__container');
  sectionCatalog.append(title, list);
};

const renderBreadCrumb = (category) => {
  const breadCrumb = document.querySelector('.nav-breadcrumb');
  breadCrumb.lastElementChild.querySelector('a').textContent = category;
};

const renderPageCard = async () => {
  const [category, goodID] = getHashFromURL().split('#');
  renderBreadCrumb(category);

  const urlParam = `/goods/${goodID}`;
  const dataGood = await fetchGoods(urlParam);

  const {titlePage, wrapCard, titleDescript, content} = createCard(dataGood);

  // const urlCatalog = `https://determined-painted-hawthorn.glitch.me/api/goods/category/${dataGood.category}`;
  // const dataRecommend = await fetchGoods(urlCatalog);

  const cardContainer = document.querySelector('.good-card');
  cardContainer.append(titlePage, wrapCard, titleDescript, content);

  // const recomContainer = document.querySelector('.recommend');
  // const {titleRecom, wrapRecom} = createRecommend(dataRecommend);
  // recomContainer.append(titleRecom, wrapRecom);

  return dataGood;
};


export {renderMenu, renderCatalog, renderPageCard};
