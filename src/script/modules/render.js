import { fetchGoods } from './fetchCard.js';
import {createMenuItem, createCatalog, createCard, createRecommend, createElemWithClass, createCartListItem, createDeliveryImg} from './createElements.js';
import { getCountGoodInCart, getHashFromURL } from './commonFunction.js';
import { getLocalStorage } from './localStorageCart.js';

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
  const catalogName = getHashFromURL('category');

  const urlParam = `/goods/category/${catalogName}`;
  const catalogDate = await fetchGoods(urlParam);

  const title = createElemWithClass('h1', 'catalog__title');
  title.textContent = catalogName;
  const list = createCatalog(catalogDate, catalogName);

  const sectionCatalog = document.querySelector('.catalog__container');
  sectionCatalog.innerHTML = '';
  sectionCatalog.append(title, list);
};

const renderBreadCrumb = (category) => {
  const breadCrumb = document.querySelector('.nav-breadcrumb');
  breadCrumb.lastElementChild.querySelector('a').textContent = category;
};

const renderPageCard = async () => {
  const [category, goodID] = getHashFromURL('category', 'id');
  renderBreadCrumb(category);

  const urlPageParams = `/goods/${goodID}`;
  const dataGood = await fetchGoods(urlPageParams);
  const {titlePage, wrapCard, titleDescript, content} = createCard(dataGood);

  const urlCatalogParams = `/goods/category/${dataGood.category}`;
  const dataRecommend = await fetchGoods(urlCatalogParams);
  const {titleRecommend, wrapRecommend} = createRecommend(dataRecommend);

  const cardContainer = document.querySelector('.good-card');
  cardContainer.append(titlePage, wrapCard, titleDescript, content);

  const recomContainer = document.querySelector('.recommend');

  recomContainer.append(titleRecommend, wrapRecommend);

  return dataGood;
};

const showCountGoodInCart = (flag) => {
  const countInCartBn = getCountGoodInCart();

  const btnCartCount = document.querySelector('.btn-cart__count');
  if (countInCartBn) {
    btnCartCount.textContent = countInCartBn;
    btnCartCount.style.backgroundColor = '#ffffff';
  } else {
    btnCartCount.textContent = countInCartBn;
    btnCartCount.style.backgroundColor = 'transparent';
  }
  if (flag) {
      document.querySelector('.cart__count').textContent = countInCartBn;
      document.querySelector('.span__count').textContent = countInCartBn
  }

};

const renderShopPage = () => {
  const CARTLIST = document.querySelector('.cart-list');

  const cart = getLocalStorage() || [];
  if (cart) {
    cart.forEach(async item => {
      const urlParam = `/goods/${item.id}`;
      const data = await fetchGoods(urlParam);
      const cartListItem = createCartListItem(data, item.count);
      CARTLIST.append(cartListItem);

      const deliveryInfo = document.querySelector('.delivery__info-img');
      const deliveryImg = createDeliveryImg(data);
      deliveryInfo.append(deliveryImg);
    });
  } else {
    console.log('В КОРЗИНЕ ПУСТО');
    // TODO: showMessage
  }
};


export {renderMenu, renderCatalog, renderPageCard, showCountGoodInCart, renderShopPage};
