import {createHrefLink} from './fetchCard.js'

const createElemWithClass = (elem, className) => {
  const elemClass = document.createElement(elem);
  elemClass.className = className;
  return elemClass;
};

const createSaleIcon = (tegName, className, discount) => {
  const spanSale = createElemWithClass(tegName, className);
  spanSale.textContent = `-${discount}%`;
  return spanSale;
};

const createCatalogItem = ({id, price, title, image, discount, category}) => {
  const li = createElemWithClass('li', 'benefit__item card');
  li.dataset.name = id;

  const path = 'card.html';
  const hash = `#${category}#${id}`;
  const href = createHrefLink(path, hash);
  const link = createElemWithClass('a', 'benefit__link');
  link.href = href;

  const wrapIMG = createElemWithClass('div', 'card-img__wrapper');

  const img = createElemWithClass('img', 'card__img'); 
  img.loading = 'lazy';
  img.width = '420';
  img.height = '295';
  if (image === 'image/notimage.jpg') {
    img.src = 'assets/images/no-photo.jpg';
  } else {
    img.src = `https://determined-painted-hawthorn.glitch.me/${image}`;
  }
  wrapIMG.append(img);

  const wrapPrice = createElemWithClass('div', 'card__price');

  const priceFinal = createElemWithClass('span', 'card__sale-price');
  priceFinal.textContent = `${price} ₽`;

  if (discount) {
    const saleIcon = createSaleIcon('span', 'card__sale', discount);
    wrapIMG.append(saleIcon);
    const priceStart = createElemWithClass('span', 'card__start-price');
    priceStart.textContent = `${price} ₽`;
    priceFinal.textContent = Math.round((price * (100 - discount)) / 100) + ' ₽';
    wrapPrice.append(priceFinal, priceStart);
  } else {
    wrapPrice.append(priceFinal);
  }

  const itemTitle = createElemWithClass('p', 'card__title');
  itemTitle.textContent = title;

  link.append(wrapIMG, wrapPrice, title);
  li.append(link);

  return li;
};

const createTitle = (className, name) => {
  const title = createElemWithClass('h1', className);
  title.textContent = name;
  return title;
};

const createCatalog = (data) => {
  const catalogList = data.map(item => createCatalogItem(item));
  const list = createElemWithClass('ul', 'benefit__list');
  list.append(...catalogList);
  return list;
};

const createBreadCrumb = (category) => {
  const breadCrumb = document.querySelector('.nav-breadcrumb');
  breadCrumb.lastElementChild.querySelector('a').textContent = category;
};

const createImgCard = ({discount, image}) => {
  const imgBox = createElemWithClass('div', 'good-card__img-box');
  const img = createElemWithClass('img', 'good-card__img');
  // img.width = '420';
  // img.height = '295';
  if (image === 'image/notimage.jpg') {
    img.src = 'assets/images/no-photo.jpg';
  } else {
    img.src = `https://determined-painted-hawthorn.glitch.me/${image}`;
  }

  imgBox.append(img);

  if (discount) {
    const saleIcon = createSaleIcon('div', 'sale good-card__sale', discount);
    imgBox.append(saleIcon);
  }

  return imgBox;
};

const formatCartPrice = (stringPrice) => {
  const last = stringPrice % 1000;
  const first = Math.trunc(stringPrice / 1000);
  return String(first) + ' ' + (last || '000');
};

const createCart = ({price: priceStart, discount}) => {
  let priceFinal = Math.round((priceStart * (100 - discount)) / 100);

  if (String(priceFinal).length >= 4) {
    priceFinal = formatCartPrice(String(priceFinal));
  }
  if (String(priceStart).length >= 4) {
    priceStart = formatCartPrice(String(priceStart));
  }

  const cart = createElemWithClass('div', 'good-card__price good-price');

  cart.insertAdjacentHTML('afterbegin',
      `     
        <p class="good-price__credit">В кредит от 5600 ₽ </p>
        <button class="button good-price__btn">Добавить в корзину</button>
        <button class="good-price__favorite"></button>
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

  const priceFinalElem = createElemWithClass('span', 'good-price__title');
  priceFinalElem.textContent = `${priceFinal} ₽`;
  cart.prepend(priceFinalElem);

  if (discount) {
    const priceStartElem = createElemWithClass('span', 'good-price__old-title');
    priceStartElem.textContent = `${priceStart} ₽`;
    priceFinalElem.after(priceStartElem);
  }

  return cart;
};

const createDescript = ({description}) => {
  const title = createElemWithClass('h2', 'good-card__subtitle');
  title.textContent = 'Описание:';
  const content = createElemWithClass('p', 'good-card__description');
  content.textContent = description;
  return {title, content};
};

const createRecommend = (data) => {
  const titleRecom = createElemWithClass('p', 'recommend__title');
  titleRecom.textContent = 'Рекомендуем также';
  const wrapRecom = createElemWithClass('div', 'recommend__wrap');
  const listRecommend = createCatalog(data);
  wrapRecom.append(listRecommend);
  return {titleRecom, wrapRecom}
};

export {createTitle, createCatalog, createCart, createImgCard, createBreadCrumb, createDescript, createElemWithClass, createRecommend};
