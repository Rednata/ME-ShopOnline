import { loadAuthor } from './fetch.js';
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
  breadcrumb.classList.add('bread');
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

  headerPage.append(breadcrumb);

  const paginationWrap = createPaginationWrap();
  const pagination = createPaginationNumber(paginationWrap, currentPage);
  section.append(paginationWrap);

  mainPage.append(section);
  return {pagination};
};

// ============  ARTICLE ================
const articleWrap = document.createElement('div');
articleWrap.classList.add('articleWrap', 'container');

const createHeader = (title) => {
  const breadcrumb = document.createElement('div');
  breadcrumb.classList.add('bread');
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
  const section = document.createElement('section');
  section.insertAdjacentHTML('afterbegin',
      `
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
  // const main = document.querySelector('.main');
  // mainPage.append(footer);
  articleWrap.append(footer);
};

const createArticlePage = (articleData) => {
  const {
    title,
    body,
    user_id,
  } = articleData;

  const header = createHeader(title);
  const section = createMain(title, body);
  const aside = createAside();
  loadAuthor(user_id);

  articleWrap.append(aside, section);
  headerPage.append(header);
  mainPage.append(articleWrap);
};

export {createBlogPage, createArticlePage, createPaginationNumber, createFooter};
