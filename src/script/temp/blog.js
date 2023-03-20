/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script/modules/createElementsBlog.js":
/*!**************************************************!*\
  !*** ./src/script/modules/createElementsBlog.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createArticlePage": () => (/* binding */ createArticlePage),
/* harmony export */   "createBlogPage": () => (/* binding */ createBlogPage),
/* harmony export */   "createFooter": () => (/* binding */ createFooter),
/* harmony export */   "createPaginationNumber": () => (/* binding */ createPaginationNumber)
/* harmony export */ });
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch.js */ "./src/script/modules/fetch.js");

// ===================== BLOG ==========================

const headerPage = document.querySelector('.header');
const footerPage = document.querySelector('.footer');

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

const createPost = ({title, id}) => {
  const li = document.createElement('li');
  li.classList.add('blog-item');

  // const linkPost = `article.html?id=${id}`;
  li.insertAdjacentHTML('afterbegin',
      `
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

const renderPost = (postList) => {
  const data = postList.map(post => createPost(post));

  return data;
};

// ================  PAGINATION  ========================
const createPaginationWrap = () => {
  const paginationWrap = document.createElement('div');
  paginationWrap.classList.add('pagination');
  paginationWrap.insertAdjacentHTML('afterbegin',
      `    
        <a class="arrow arrow_left"></a>
        <div class="pagination-group">
        </div>
        <a class="arrow arrow_right"></a>    
      `);
  return paginationWrap;
};

const createPaginationNumber = (paginationWrap, currentPage, startPage) => {
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

const createBlogPage = (postList, currentPage) => {
  const section = createSection();
  const blog = createUl();
  blog.append(...renderPost(postList.data));
  section.append(blog);

  const breadcrumb = document.createElement('div');
  breadcrumb.classList.add('bread', 'container');
  breadcrumb.insertAdjacentHTML('afterbegin',
      `<ul class="nav-breadcrumb">
          <li class="nav-breadcrumb__li">
            <a class="nav-breadcrumb__main" href="index.html">Главная</a>
          </li>
          <li class="nav-breadcrumb__li">
            <a class="goBlog" href="blog.html">Блог</a>
          </li>           
        </ul>
      `);

  headerPage.after(breadcrumb, section);

  const paginationWrap = createPaginationWrap();
  const pagination = createPaginationNumber(paginationWrap, currentPage);
  section.append(paginationWrap);

  footerPage.before(section);
  // document.body.append(section);
  return {pagination};
};

// ============  ARTICLE ================
const articleWrap = document.createElement('div');
articleWrap.className = 'articleWrap';

const createHeader = (title) => {
  const breadcrumb = document.createElement('div');
  breadcrumb.classList.add('bread', 'container');
  breadcrumb.insertAdjacentHTML('afterbegin',
      `<ul class="nav-breadcrumb">
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
  const main = document.createElement('main');
  main.classList.add('main');
  main.insertAdjacentHTML('afterbegin',
      `
        <article class="article">
          <h1 class="title article__title">${title}</h1>
          <p class="article__text">${body}</p>
        </article>
      `);
  return main;
};

const createAside = () => {
  const aside = document.createElement('aside');
  aside.className = 'aside';
  aside.insertAdjacentHTML('afterbegin',
      `
        <img src="assets/images/add.jpg" alt="" class="article__img">
        <img src="assets/images/add.jpg" alt="" class="article__img">
      `);
  return aside;
};

const createFooter = (author) => {
  const nameAuthor = author.data.name || '';
  const footer = document.createElement('footer');
  footer.classList.add('footer-article');
  footer.insertAdjacentHTML('afterbegin',
      `
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
  const main = document.querySelector('.main');
  main.append(footer);
  return footer;
};

const createArticlePage = (articleData) => {
  const {
    title,
    body,
    user_id,
  } = articleData;

  const header = createHeader(title);
  const main = createMain(title, body);
  const aside = createAside();

  (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.loadAuthor)(user_id);
  articleWrap.append(aside, main);
  headerPage.after(header, articleWrap);
};




/***/ }),

/***/ "./src/script/modules/fetch.js":
/*!*************************************!*\
  !*** ./src/script/modules/fetch.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadArticle": () => (/* binding */ loadArticle),
/* harmony export */   "loadAuthor": () => (/* binding */ loadAuthor),
/* harmony export */   "loadPosts": () => (/* binding */ loadPosts)
/* harmony export */ });
/* harmony import */ var _createElementsBlog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElementsBlog.js */ "./src/script/modules/createElementsBlog.js");
/* harmony import */ var _paginationFunc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paginationFunc.js */ "./src/script/modules/paginationFunc.js");



const loadPosts = async (currentPage) => {
  // document.body.innerHTML = '';

  const url = new URL(window.location);
  const queryParams = url.search;
  currentPage = +queryParams.slice(6) || 1;

  const response = await fetch(`https://gorest.co.in/public-api/posts${queryParams}`);
  const postList = await response.json();

  (0,_createElementsBlog_js__WEBPACK_IMPORTED_MODULE_0__.createBlogPage)(postList, currentPage);

  (0,_paginationFunc_js__WEBPACK_IMPORTED_MODULE_1__.onClickArrow)(queryParams);
};

const loadArticle = async() => {
  const url = new URL(window.location);
  const queryParams = url.search.slice(4);
  const response = await fetch(`https://gorest.co.in/public-api/posts/${queryParams}`);

  const articleData = await response.json();

  (0,_createElementsBlog_js__WEBPACK_IMPORTED_MODULE_0__.createArticlePage)(articleData.data);
};

const loadAuthor = async(userID) => {
  const response = await fetch(`https://gorest.co.in/public-api/users/${userID}`);

  const author = await response.json();
  
  (0,_createElementsBlog_js__WEBPACK_IMPORTED_MODULE_0__.createFooter)(author);
};







/***/ }),

/***/ "./src/script/modules/paginationFunc.js":
/*!**********************************************!*\
  !*** ./src/script/modules/paginationFunc.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onClickArrow": () => (/* binding */ onClickArrow)
/* harmony export */ });
/* harmony import */ var _createElementsBlog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElementsBlog.js */ "./src/script/modules/createElementsBlog.js");


const getStartPage = (pagination) => +pagination.firstElementChild.dataset.number; 

const changePageNumber = (paginationWrap, startPage, currentPage, arrowDirect) => {
  if (arrowDirect === 'left') {
    if (startPage <= 1) {
      (0,_createElementsBlog_js__WEBPACK_IMPORTED_MODULE_0__.createPaginationNumber)(paginationWrap, currentPage, 1);
    } else {
      (0,_createElementsBlog_js__WEBPACK_IMPORTED_MODULE_0__.createPaginationNumber)(paginationWrap, currentPage, startPage - 1);
    }
  } else {
    (0,_createElementsBlog_js__WEBPACK_IMPORTED_MODULE_0__.createPaginationNumber)(paginationWrap, currentPage, startPage + 1);
  }
};

const onClickArrow = (queryParams) => {
  const paginationWrap = document.querySelector('.pagination');
  const pagination = document.querySelector('.pagination-group');

  paginationWrap.addEventListener('click', (e) => {
    
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




/***/ }),

/***/ "./src/script/modules/showNavigation.js":
/*!**********************************************!*\
  !*** ./src/script/modules/showNavigation.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showHeaderMenu": () => (/* binding */ showHeaderMenu),
/* harmony export */   "showNavigation": () => (/* binding */ showNavigation)
/* harmony export */ });
const showNavigation = () => {
  const navFooter = document.querySelector('.navFooter');
  const navTitleCatalog = navFooter.querySelector('.nav__item_catalog').firstElementChild;
  const navTitleBuyer = navFooter.querySelector('.nav__item_buyer').firstElementChild;

  const catalog = navFooter.querySelector('.sublist_catalog');
  const buyer = navFooter.querySelector('.sublist_buyer');

  navTitleCatalog.addEventListener('click', () => {
    catalog.classList.toggle('sublist_show');
    const btnCatalog = navTitleCatalog.querySelector('.nav__btn');
    btnCatalog.classList.toggle('nav__btn_open');
  });

  navTitleBuyer.addEventListener('click', () => {
    buyer.classList.toggle('sublist_show');
    const btnBuyer = navTitleBuyer.querySelector('.nav__btn');
    btnBuyer.classList.toggle('nav__btn_open');
  });
};

const showHeaderMenu = () => {
  const menuBtn = document.querySelector('.menu');
  menuBtn.addEventListener('click', () => {
    document.querySelector('.header-nav').classList.toggle('header-nav_active')
  })
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/script/blog.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/fetch.js */ "./src/script/modules/fetch.js");
/* harmony import */ var _modules_showNavigation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/showNavigation.js */ "./src/script/modules/showNavigation.js");



const init = () => {
  (0,_modules_fetch_js__WEBPACK_IMPORTED_MODULE_0__.loadPosts)();
  (0,_modules_showNavigation_js__WEBPACK_IMPORTED_MODULE_1__.showNavigation)();
};

init();
})();

/******/ })()
;
//# sourceMappingURL=blog.js.map