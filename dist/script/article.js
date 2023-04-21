/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/script/modules/createElementsBlog.js

// ===================== BLOG ==========================

const headerPage = document.querySelector('.header');
// const footerPage = document.querySelector('.footer');
const mainPage = document.querySelector('main');
const createSection = () => {
  const section = document.createElement('section');
  section.classList.add('section', 'container');
  return section;
};
const createUl = () => {
  const ul = document.createElement('ul');
  ul.classList.add('blog');
  return ul;
};
const createPost = ({
  title,
  id
}) => {
  const li = document.createElement('li');
  li.classList.add('blog-item');

  // const linkPost = `article.html?id=${id}`;
  li.insertAdjacentHTML('afterbegin', `
        <a class="blog-item__link" href="article.html?id=${id}" target="_blank">

        <picture>
          <source srcset="assets/images/Rectangle.avif" type="image/avif">
          <source srcset="assets/images/Rectangle.webp" type="image/webp">
          <img class="blog-item__image" src="./assets/images/Rectangle.jpg" alt="">
        </picture>

          
        </a> 
        <div class="blog-item__content">
          <a class="blog-item__link" href="article.html?id=${id}" target="_blank">
            <h2 class="blog-item__title">${title}</h2>
          </a>

          <div class="info">
          <span class="info__date">22 октября 2021, 12:45</span>
          <div class="info-wrap">
            <div class="info__view">
              <span class="info__img info__img_view"></span>
              <p class="info__count">1.2K</p>              
            </div>
            <div class="info__comments">
              <span class="info__img info__img_comments"></span>
              <p class="info__count">0</p>              
            </div>
          </div>
          </div>          

        </div>  
      `);
  return li;
};
const renderPost = postList => {
  const data = postList.map(post => createPost(post));
  return data;
};

// ================  PAGINATION  ========================
const createPaginationWrap = () => {
  const paginationWrap = document.createElement('div');
  paginationWrap.classList.add('pagination');
  paginationWrap.insertAdjacentHTML('afterbegin', `    
        <a class="arrow arrow_left"></a>
        <div class="pagination-group">
        </div>
        <a class="arrow arrow_right"></a>    
      `);
  return paginationWrap;
};
const createElementsBlog_createPaginationNumber = (paginationWrap, currentPage, startPage) => {
  startPage ||= currentPage;
  const pagination = paginationWrap.querySelector('.pagination-group');
  pagination.innerHTML = '';
  const pages = [];
  for (let i = startPage; i < startPage + 3; i++) {
    const link = document.createElement('a');
    link.className = 'pagination__page';
    if (i === currentPage) {
      link.classList.add('active');
    }
    link.setAttribute('data-number', `${i}`);
    link.href = `blog.html?page=${i}`;
    link.textContent = i;
    pages.push(link);
  }
  pagination.append(...pages);
  return pagination;
};
const createElementsBlog_createBlogPage = (postList, currentPage) => {
  const section = createSection();
  const blog = createUl();
  blog.append(...renderPost(postList.data));
  section.append(blog);
  const breadcrumb = document.createElement('div');
  breadcrumb.classList.add('bread');
  breadcrumb.insertAdjacentHTML('afterbegin', `<ul class="nav-breadcrumb">
          <li class="nav-breadcrumb__li">
            <a class="nav-breadcrumb__main" href="index.html">Главная</a>
          </li>
          <li class="nav-breadcrumb__li">
            <a class="goBlog" href="blog.html">Блог</a>
          </li>           
        </ul>
      `);
  headerPage.append(breadcrumb);
  const paginationWrap = createPaginationWrap();
  const pagination = createElementsBlog_createPaginationNumber(paginationWrap, currentPage);
  section.append(paginationWrap);
  mainPage.append(section);
  return {
    pagination
  };
};

// ============  ARTICLE ================
const articleWrap = document.createElement('div');
articleWrap.classList.add('articleWrap', 'container');
const createHeader = title => {
  const breadcrumb = document.createElement('div');
  breadcrumb.classList.add('bread');
  breadcrumb.insertAdjacentHTML('afterbegin', `<ul class="nav-breadcrumb">
          <li class="nav-breadcrumb__li">
            <a class="nav-breadcrumb__main" href="index.html">Главная</a>
          </li>
          <li class="nav-breadcrumb__li">
            <a class="goBlog" href="blog.html">Блог</a>
          </li>
          <li class="nav-breadcrumb__li nav-breadcrumb__title">${title}
          </li>      
        </ul>
      `);
  return breadcrumb;
};
const createMain = (title, body) => {
  const section = document.createElement('section');
  section.insertAdjacentHTML('afterbegin', `
        <article class="article">
          <h1 class="title article__title">${title}</h1>
          <p class="article__text">${body}</p>
        </article>
      `);
  return section;
};
const createAside = () => {
  const aside = document.createElement('aside');
  aside.className = 'aside';
  aside.insertAdjacentHTML('afterbegin', `
        <img src="assets/images/add.jpg" alt="" class="article__img">
        <img src="assets/images/add.jpg" alt="" class="article__img">
      `);
  return aside;
};
const createFooter = author => {
  const nameAuthor = author.data.name || '';
  const footer = document.createElement('footer');
  footer.classList.add('footer-article');
  footer.insertAdjacentHTML('afterbegin', `
        <a class="footer-article__back" href="blog.html">К списку статей</a>
          <div class="footer-article__about">
          <div class="footer-article__author">
            ${nameAuthor}
          </div>

          <div class="info info_article">
          <span class="info__date">22 октября 2021, 12:45</span>
          <div class="info-wrap">
            <div class="info__view">
              <span class="info__img info__img_view"></span>
              <p class="info__count">1.2K</p>              
            </div>
            <div class="info__comments">
              <span class="info__img info__img_comments"></span>
              <p class="info__count">0</p>              
            </div>
          </div>
          </div> 
          
        </div>
      `);
  // const main = document.querySelector('.main');
  // mainPage.append(footer);
  articleWrap.append(footer);
};
const createArticlePage = articleData => {
  const {
    title,
    body,
    user_id
  } = articleData;
  const header = createHeader(title);
  const section = createMain(title, body);
  const aside = createAside();
  loadAuthor(user_id);
  articleWrap.append(aside, section);
  headerPage.append(header);
  mainPage.append(articleWrap);
};

;// CONCATENATED MODULE: ./src/script/modules/paginationFunc.js

const getStartPage = pagination => +pagination.firstElementChild.dataset.number;
const changePageNumber = (paginationWrap, startPage, currentPage, arrowDirect) => {
  if (arrowDirect === 'left') {
    if (startPage <= 1) {
      createPaginationNumber(paginationWrap, currentPage, 1);
    } else {
      createPaginationNumber(paginationWrap, currentPage, startPage - 1);
    }
  } else {
    createPaginationNumber(paginationWrap, currentPage, startPage + 1);
  }
};
const paginationFunc_onClickArrow = queryParams => {
  const paginationWrap = document.querySelector('.pagination');
  const pagination = document.querySelector('.pagination-group');
  paginationWrap.addEventListener('click', e => {
    if (e.target.closest('.arrow_left')) {
      e.preventDefault();
      const startPage = getStartPage(pagination);
      const currentPage = +queryParams.slice(6);
      changePageNumber(paginationWrap, startPage, currentPage, 'left');
    }
    if (e.target.closest('.arrow_right')) {
      e.preventDefault();
      const startPage = getStartPage(pagination);
      const currentPage = +queryParams.slice(6);
      changePageNumber(paginationWrap, startPage, currentPage, 'right');
    }
  });
};

;// CONCATENATED MODULE: ./src/script/modules/fetch.js


const loadPosts = async currentPage => {
  // document.body.innerHTML = '';

  const url = new URL(window.location);
  const queryParams = url.search;
  currentPage = +queryParams.slice(6) || 1;
  const response = await fetch(`https://gorest.co.in/public-api/posts${queryParams}`);
  const postList = await response.json();
  createBlogPage(postList, currentPage);
  onClickArrow(queryParams);
};
const loadArticle = async () => {
  const url = new URL(window.location);
  const queryParams = url.search.slice(4);
  const response = await fetch(`https://gorest.co.in/public-api/posts/${queryParams}`);
  const articleData = await response.json();
  createArticlePage(articleData.data);
};
const loadAuthor = async userID => {
  const response = await fetch(`https://gorest.co.in/public-api/users/${userID}`);
  const author = await response.json();
  createFooter(author);
};

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
    priceFinal.textContent = getPriceFinal(price, discount) + ' ₽';
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
const renderBreadCrumb = category => {
  const breadCrumb = document.querySelector('.nav-breadcrumb');
  const link = breadCrumb.lastElementChild.querySelector('a');
  link.textContent = category;
  link.href = `catalog.html?category=${category}`;
};
const renderPageCard = async () => {
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


;// CONCATENATED MODULE: ./src/script/article.js




const init = () => {
  loadArticle();
  showNavigation();
  onClickHeaderBtnMenu();
  renderMenu();
  showCountGoodInCart();
};
init();
/******/ })()
;