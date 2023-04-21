/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/script/modules/showNavigation.js
const showNavigation = () => {
  const NAV_TITLE_CATALOG = document.querySelectorAll('.nav__item_catalog .nav__title');
  const NAV_TITLE_BUYER = document.querySelectorAll('.nav__item_buyer .nav__title');
  const CATALOG = document.querySelectorAll('.sublist_catalog');
  const BUYER = document.querySelectorAll('.sublist_buyer');
  NAV_TITLE_CATALOG.forEach((title, ind) => {
    title.addEventListener('click', () => {
      CATALOG[ind].classList.toggle('sublist_show');
    });
  });
  NAV_TITLE_BUYER.forEach((title, ind) => {
    title.addEventListener('click', () => {
      BUYER[ind].classList.toggle('sublist_show');
    });
  });
};
const onClickHeaderBtnMenu = () => {
  const MENU_BTN = document.querySelector('.menu');
  const MENU_BTN_IMG = MENU_BTN.querySelector('.menu__img');
  MENU_BTN.addEventListener('click', () => {
    document.querySelector('.header-nav').classList.toggle('header-nav_active');
    MENU_BTN_IMG.classList.toggle('menu__img-active');
  });
};
;// CONCATENATED MODULE: ./src/script/modules/fetchCard.js
const fetchCard_URL = 'https://determined-painted-hawthorn.glitch.me/api';
const fetchCard_fetchGoods = async param => {
  const response = await fetch(fetchCard_URL + param);
  const data = await response.json();
  return data;
};
const createHrefLink = (path, hash) => {
  const url = new fetchCard_URL(document.location);
  url.pathname = path;
  url.hash = hash;
  return url;
};

;// CONCATENATED MODULE: ./src/script/modules/localStorageCart.js
const addInLocalStorage = data => {
  localStorage.setItem('cart', JSON.stringify(data));
};
const localStorageCart_getLocalStorage = () => JSON.parse(localStorage.getItem('cart'));
const clearLocalStorage = () => {
  localStorage.clear();
};

;// CONCATENATED MODULE: ./src/script/modules/commonFunction.js

const commonFunction_getHashFromURL = (search1, search2) => {
  const url = new URL(window.location.href);
  if (search2) {
    return [url.searchParams.get(search1), url.searchParams.get(search2)];
  } else return url.searchParams.get(search1);
};
const commonFunction_getPriceFinal = (price, discount) => Math.round(price * (100 - discount) / 100);
const commonFunction_formatPrice = price => {
  if (String(price).length >= 4) {
    const last = price % 1000;
    const first = Math.trunc(price / 1000);
    return String(first) + ' ' + (String(last).padStart(3, '0') || '000');
  } else {
    return price;
  }
};
const getCountGoodInCart = () => {
  const cart = localStorageCart_getLocalStorage() || [];
  const countInCart = cart.reduce((acc, elem) => acc + Number(elem.count), 0) || '';
  return countInCart;
};
const getIndexGoodInLocalStorage = (localStorageCart, id) => localStorageCart.findIndex(item => item.id === id);
const fromStrFormatToNumber = str => Number(str.match(/\d/g).join(''));

;// CONCATENATED MODULE: ./src/script/modules/createElements.js

const getTimeInner = timeDuration => {
  timeDuration.insertAdjacentHTML('afterbegin', ` <p class="time__title">
      До конца акции:
    </p>
    <div class="time__duration">
      <div class="time__show time__show_days">
        <p class="time__digital digital__day"></p>
      <p class="time__alpha alpha__day"></p>
      </div>
      <div class="time__show time__show_hours">
        <p class="time__digital digital__hour"></p>
        <p class="time__alpha alpha__hour"></p>
      </div>
      <div class="time__show time__show_minutes">
        <p class="time__digital digital__minute"></p>
        <p class="time__alpha alpha__minute"></p>
      </div>
      <div class="time__show time__show_seconds">
        <p class="time__digital digital__second"></p><p class="time__alpha alpha__second"></p>
      </div>                        
    </div> `);
  return timeDuration;
};
const createElements_createElemWithClass = (elem, className) => {
  const elemClass = document.createElement(elem);
  elemClass.className = className;
  return elemClass;
};
const createSaleIcon = (tegName, className, discount) => {
  const spanSale = createElements_createElemWithClass(tegName, className);
  spanSale.textContent = `-${discount}%`;
  return spanSale;
};

//  ==================  MENU ===========================
const createMenuItem = item => {
  const liItem = createElements_createElemWithClass('li', 'sublist__item');
  const link = createElements_createElemWithClass('a', 'sublist__link');
  link.textContent = item;
  liItem.append(link);
  link.href = `catalog.html?category=${item}`;
  return liItem;
};

// ================  CATALOG page  =====================

const createCatalogItem = ({
  id,
  price,
  title,
  image,
  discount,
  category
}) => {
  const li = createElements_createElemWithClass('li', 'benefit__item card');
  li.dataset.name = id;
  const link = createElements_createElemWithClass('a', 'benefit__link');
  const href = `card.html?category=${category}&id=${id}`;
  // link.target = '_blank';
  link.href = href;
  const wrapIMG = createElements_createElemWithClass('div', 'card-img__wrapper');
  const img = createElements_createElemWithClass('img', 'card__img');
  img.loading = 'lazy';
  img.width = '420';
  img.height = '295';
  img.src = `https://determined-painted-hawthorn.glitch.me/${image}`;
  img.addEventListener('error', () => {
    img.src = 'assets/images/no-photo.jpg';
  });
  wrapIMG.append(img);
  const wrapPrice = createElements_createElemWithClass('div', 'card__price');
  const priceFinal = createElements_createElemWithClass('span', 'card__sale-price');
  priceFinal.textContent = `${price} ₽`;
  if (discount) {
    const saleIcon = createSaleIcon('span', 'card__sale', discount);
    wrapIMG.append(saleIcon);
    const priceStart = createElements_createElemWithClass('span', 'card__start-price');
    priceStart.textContent = `${price} ₽`;
    priceFinal.textContent = commonFunction_getPriceFinal(price, discount) + ' ₽';
    wrapPrice.append(priceFinal, priceStart);
  } else {
    wrapPrice.append(priceFinal);
  }
  const itemTitle = createElements_createElemWithClass('p', 'card__title');
  itemTitle.textContent = title;
  link.append(wrapIMG, wrapPrice, itemTitle);
  li.append(link);
  return li;
};
const createElements_createCatalog = (data, catalogName) => {
  const catalogList = data.map(item => createCatalogItem(item));
  const list = createElements_createElemWithClass('ul', 'benefit__list');
  list.append(...catalogList);
  return list;
};

// ==================  CARD page ========================

const createImgCard = ({
  discount,
  image
}) => {
  const imgBox = createElements_createElemWithClass('div', 'good-card__img-box');
  const img = createElements_createElemWithClass('img', 'good-card__img');
  // img.width = '420';
  // img.height = '295';
  img.src = `https://determined-painted-hawthorn.glitch.me/${image}`;
  img.addEventListener('error', () => {
    img.src = 'assets/images/no-photo.jpg';
  });
  imgBox.append(img);
  if (discount) {
    const saleIcon = createSaleIcon('div', 'sale good-card__sale', discount);
    imgBox.append(saleIcon);
  }
  return imgBox;
};
const createCart = ({
  price: priceStart,
  discount
}) => {
  const cart = createElements_createElemWithClass('div', 'good-card__price good-price');
  cart.insertAdjacentHTML('afterbegin', `     
        <p class="good-price__credit">В кредит от 5600 ₽ </p>
        <button class="button good-price__btn">Добавить в корзину</button>
        <button class="good-price__favorite">
          <svg width="33" height="33" viewBox="0 0 33 33" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_901_1437)">
              <path d="M22.6875 4.125C20.295 4.125 17.9987 5.23875 16.5 6.99875C15.0012 5.23875 12.705 4.125 10.3125 4.125C6.0775 4.125 2.75 7.4525 2.75 11.6875C2.75 16.885 7.425 21.12 14.5062 27.555L16.5 29.3563L18.4937 27.5413C25.575 21.12 30.25 16.885 30.25 11.6875C30.25 7.4525 26.9225 4.125 22.6875 4.125ZM16.6375 25.5062L16.5 25.6437L16.3625 25.5062C9.8175 19.58 5.5 15.6613 5.5 11.6875C5.5 8.9375 7.5625 6.875 10.3125 6.875C12.43 6.875 14.4925 8.23625 15.2212 10.12H17.7925C18.5075 8.23625 20.57 6.875 22.6875 6.875C25.4375 6.875 27.5 8.9375 27.5 11.6875C27.5 15.6613 23.1825 19.58 16.6375 25.5062Z" fill="currentColor"/>
            </g>
            <defs>
              <clipPath id="clip0_901_1437">
              <rect width="33" height="33" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
        <div class="good-price__outer-box">
          <div class="good-price__inner-box">
            <p class="good-price__subtitle">
              Доставка
            </p>
            <p class="good-price__subtitle-detail">
              1-3 января
            </p>
          </div>
          <div class="good-price__inner-box">
            <p class="good-price__subtitle">
              Продавец
            </p>
            <p class="good-price__subtitle-detail">
              ShopOnline
            </p>          
          </div>
          </div>
          <button class="good-price__bell">Узнать о снижении цены</button>
        </div>
      `);
  const priceFinal = getPriceFinal(priceStart, discount);
  const formatPriceFinal = formatPrice(priceFinal);
  const formatPriceStart = formatPrice(priceStart);
  const priceFinalElem = createElements_createElemWithClass('span', 'good-price__title');
  priceFinalElem.textContent = `${formatPriceFinal} ₽`;
  cart.prepend(priceFinalElem);
  if (discount) {
    const priceStartElem = createElements_createElemWithClass('span', 'good-price__old-title');
    priceStartElem.textContent = `${formatPriceStart} ₽`;
    priceFinalElem.after(priceStartElem);
  }
  return cart;
};
const createDescript = ({
  description
}) => {
  const title = createElements_createElemWithClass('h2', 'good-card__subtitle');
  title.textContent = 'Описание:';
  const content = createElements_createElemWithClass('p', 'good-card__description');
  content.textContent = description;
  return {
    title,
    content
  };
};
const createElements_createCard = data => {
  const titlePage = createElements_createElemWithClass('h1', 'good-card__title');
  titlePage.textContent = data.title;
  const cart = createCart(data);
  const img = createImgCard(data);
  const wrapCard = createElements_createElemWithClass('div', 'good-card__wrap');
  wrapCard.append(img, cart);
  const {
    title: titleDescript,
    content
  } = createDescript(data);
  return {
    titlePage,
    wrapCard,
    titleDescript,
    content
  };
};
const createElements_createRecommend = data => {
  const titleRecommend = createElements_createElemWithClass('p', 'recommend__title');
  titleRecommend.textContent = 'Рекомендуем также';
  const wrapRecommend = createElements_createElemWithClass('div', 'recommend__wrap');
  const listRecommend = createElements_createCatalog(data);
  wrapRecommend.append(listRecommend);
  return {
    titleRecommend,
    wrapRecommend
  };
};

// ===================  CART page ========================

const createCartListPrice = (cartListItem, price, discount, count) => {
  if (count === '-') count = 0;
  const priceStart = formatPrice(price * count);
  const priceFinal = formatPrice(getPriceFinal(price * count, discount));
  const cartListPrice = cartListItem.querySelector('.cart-list__price');
  cartListPrice.innerHTML = '';
  if (discount) {
    cartListPrice.insertAdjacentHTML('afterbegin', `<p class="cart-list__priceFinal">${priceFinal} ₽</p>
          <p class="cart-list__priceStart">${priceStart} ₽</p>
          <p class="cart-list__credit">В кредит от 5600 ₽ </p>
    `);
  } else {
    cartListPrice.insertAdjacentHTML('afterbegin', `          
        <p class="cart-list__priceFinal">${priceStart} ₽</p>
          <p class="cart-list__credit">В кредит от 5600 ₽ </p>
    `);
  }
};
const createElements_createCartListItem = ({
  title,
  price,
  image,
  discount,
  category,
  id
}, count) => {
  const cartListItem = createElements_createElemWithClass('li', 'cart-list__item');
  cartListItem.dataset.name = id;
  cartListItem.insertAdjacentHTML('afterbegin', `
      <div class="cart-list__wrap-input">
        <input class="cart-list__input" type="checkbox" name="" id="">
        <div class="cart-list__img">
          <img  src=https://determined-painted-hawthorn.glitch.me/${image} alt="" >
        </div>
      </div>
            
      <div class="cart-list__info">
        <div class="cart-list__content">
          <a href="card.html?category=${category}&id=${id}" class="cart-list__title">${title}</a>
          
        </div>
        <div class="cart-list__count-control count">
          <buton class="count__btn count__btn_minus">−</buton>
          <span class="count__text">${count}</span>
          <buton class="count__btn count__btn_plus">+</buton>
        </div>
        <div class="cart-list__price">          
        </div>
      </div>      
      <button class="cart-list__cart"></button>
  `);
  createCartListPrice(cartListItem, price, discount, count);
  return cartListItem;
};
const createElements_createDeliveryImg = ({
  image,
  id
}) => {
  const wrapImg = createElements_createElemWithClass('div', 'delivery__box-img');
  wrapImg.dataset.img = id;
  const img = createElements_createElemWithClass('img', 'delivery__img');
  img.src = `https://determined-painted-hawthorn.glitch.me/${image}`;
  img.addEventListener('error', () => {
    img.src = 'assets/images/no-photo.jpg';
  });
  wrapImg.append(img);
  return wrapImg;
};

;// CONCATENATED MODULE: ./src/script/modules/render.js




const renderMenu = async () => {
  const urlParam = '/category';
  const categoriesData = await fetchCard_fetchGoods(urlParam);
  const catalogeHeader = document.querySelector('.header .sublist_catalog');
  const catalogeFooter = document.querySelector('.footer .sublist_catalog');
  const dataLiHeader = categoriesData.map(item => createMenuItem(item));
  const dataLiFooter = categoriesData.map(item => createMenuItem(item));
  catalogeHeader.append(...dataLiHeader);
  catalogeFooter.append(...dataLiFooter);
};
const renderCatalog = async () => {
  const catalogName = commonFunction_getHashFromURL('category');
  const urlParam = `/goods/category/${catalogName}`;
  const catalogDate = await fetchCard_fetchGoods(urlParam);
  const title = createElements_createElemWithClass('h1', 'catalog__title');
  title.textContent = catalogName;
  const list = createElements_createCatalog(catalogDate, catalogName);
  const sectionCatalog = document.querySelector('.catalog__container');
  sectionCatalog.innerHTML = '';
  sectionCatalog.append(title, list);
};
const renderBreadCrumb = category => {
  const breadCrumb = document.querySelector('.nav-breadcrumb');
  const link = breadCrumb.lastElementChild.querySelector('a');
  link.textContent = category;
  link.href = `catalog.html?category=${category}`;
};
const render_renderPageCard = async () => {
  const [category, goodID] = getHashFromURL('category', 'id');
  renderBreadCrumb(category);
  const urlPageParams = `/goods/${goodID}`;
  const dataGood = await fetchGoods(urlPageParams);
  const {
    titlePage,
    wrapCard,
    titleDescript,
    content
  } = createCard(dataGood);
  const urlCatalogParams = `/goods/category/${dataGood.category}`;
  const dataRecommend = await fetchGoods(urlCatalogParams);
  const {
    titleRecommend,
    wrapRecommend
  } = createRecommend(dataRecommend);
  const cardContainer = document.querySelector('.good-card');
  cardContainer.append(titlePage, wrapCard, titleDescript, content);
  const recomContainer = document.querySelector('.recommend');
  recomContainer.append(titleRecommend, wrapRecommend);
  return dataGood;
};
const showCountGoodInCart = flag => {
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
    document.querySelector('.span__count').textContent = countInCartBn;
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

const renderBenefit = async () => {
  const url = `/goods/`;
  const data = await fetchGoods(url);
  const sales = data.filter(item => item.discount);
  const title = createElemWithClass('h1', 'catalog__title');
  title.textContent = 'Это выгодно!';
  const list = createCatalog(sales);
  const sectionCatalog = document.querySelector('.benefit__container');
  sectionCatalog.innerHTML = '';
  sectionCatalog.append(title, list);

  // console.log(sales);
};


;// CONCATENATED MODULE: ./src/script/modules/openWindow.js


const CATALOGS = document.querySelectorAll('.sublist_catalog');
const openCatalogPage = () => {
  CATALOGS.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      if (target.closest('.sublist__link')) {
        const category = target.textContent;
        location.href = `catalog.html?category=${category}`;
        renderCatalog();
      }
    });
  });
};
const openCardPage = () => {
  const category = getHashFromURL('category');
  const benefitList = document.querySelector('.benefit__list');
  benefitList.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.benefit__item')) {
      e.preventDefault();
      const good = target.closest('.benefit__item');
      const goodID = good.dataset.name;
      location.href = `card.html?category=${category}&id=${goodID}`;
      renderPageCard();
    }
  });
};

;// CONCATENATED MODULE: ./src/script/catalog.js





const init = () => {
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  openCatalogPage();
  renderCatalog();
  showCountGoodInCart();
};
init();
/******/ })()
;