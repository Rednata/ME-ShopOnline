import { notify } from "browser-sync";

const fetchGoods = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const createMenuItem = (item) => {
  const liItem = document.createElement('li');
  liItem.className = 'sublist__item';

  const link = document.createElement('a');
  link.className = 'sublist__link';
  link.textContent = item;
  link.href = `category.html`;

  liItem.append(link);

  return liItem;
};

const makeMenu = async () => {
  const url = 'https://determined-painted-hawthorn.glitch.me/api/category';
  const categoriesData = await fetchGoods(url);
  const catalogeHeader = document.querySelector('.header .sublist_catalog');
  const catalogeFooter = document.querySelector('.footer .sublist_catalog');

  const dataLiHeader = categoriesData.map(item => createMenuItem(item));
  const dataLiFooter = categoriesData.map(item => createMenuItem(item));

  catalogeHeader.append(...dataLiHeader);
  catalogeFooter.append(...dataLiFooter);
};

const createSectionTitle = (category) => {
  const title = document.createElement('h1');
  title.className = 'category__title';
  title.textContent = category;
  return title;
};

const createCategoryItem = (title, price, image, discount) => {
  const li = document.createElement('li');
  li.className = 'benefit__item card';

  if (image === 'notimage.jpg') {
    console.log('NO');
  }

  li.insertAdjacentHTML('afterbegin',
      `<a class="benefit__link" href="">
          <div class="card-img__wrapper">          
              <img loading="lazy" class="card__img" src='https://determined-painted-hawthorn.glitch.me/${image}' width="420" height="295">                    
          </div>
          <div class="card__price">
            <span class="card__sale-price">${price} ₽</span>            
          </div>
          <p class="card__title">${title}</p>
        </a>
      `);

  if (discount) {
    const spanSale = document.createElement('span');
    spanSale.className = 'card__sale';
    // spanSale.aria-label = 'Скидка';
    spanSale.textContent = `-${discount}%`;
    const cardImgWrapper = li.querySelector('.card-img__wrapper');
    cardImgWrapper.append(spanSale);

    const spanPriceStart = document.createElement('span');
    spanPriceStart.className = 'card__start-price';
    spanPriceStart.textContent = `${price} ₽`;
    const cardPrice = li.querySelector('.card__price');
    cardPrice.firstElementChild.textContent = (price * (100 - discount)) / 100 + '₽'
    cardPrice.append(spanPriceStart);    
  }

  return li;
};
const createCategoryList = (categoriesData) => {
  const categoriesItem = categoriesData.map(({ title, price, image, discount }) => createCategoryItem(title, price, image, discount));
  const ul = document.createElement('ul');
  ul.className = 'benefit__list';
  ul.append(...categoriesItem);
  return ul;
};

const loadPageCategory = async () => {
  const category = decodeURI((document.location.hash).slice(1));
  const categorySection = document.querySelector('.category__container');
  categorySection.innerHTML = '';
  const url = `https://determined-painted-hawthorn.glitch.me/api/goods/category/${category}`;
  const categoriesData = await fetchGoods(url);

  const title = createSectionTitle(category);
  const categoryList = createCategoryList(categoriesData);
  categorySection.append(title, categoryList);
};

const getCategoryLink = () => {
  const catalog = document.querySelectorAll('.sublist_catalog');
  catalog.forEach(elem => {
    elem.addEventListener('click', (e) => {
      if (e.target.classList.contains('sublist__link')) {
        e.preventDefault();
        const target = e.target;
        const hash = target.textContent;

        const url = new URL(document.location);
        url.pathname = `category.html`;
        url.hash = hash;

        window.open(url);
        loadPageCategory();
      }
    });
  });
};

export {makeMenu, getCategoryLink, loadPageCategory};
