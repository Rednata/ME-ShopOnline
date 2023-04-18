import { createImageSRC, getPriceFinal, formatPrice } from './commonFunction.js';

const getTimeInner = (timeDuration) => {
  console.log('++++');
  timeDuration.insertAdjacentHTML('afterbegin',
      ` <p class="time__title">
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
    </div> `,
  );
  return timeDuration;
};

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

//  ==================  MENU ===========================
const createMenuItem = (item) => {
  const liItem = createElemWithClass('li', 'sublist__item');
  const link = createElemWithClass('a', 'sublist__link');

  link.textContent = item;
  liItem.append(link);
  link.href = `/catalog.html#${item}`;
  link.target = '_blank';

  return liItem;
};

// ================  CATALOG page  =====================

const createCatalogItem = ({id, price, title, image, discount, category}) => {
  const li = createElemWithClass('li', 'benefit__item card');
  li.dataset.name = id;

  const link = createElemWithClass('a', 'benefit__link');
  const href = `/card.html#${category}#${id}`;
  link.target = '_blank';
  link.href = href;

  const wrapIMG = createElemWithClass('div', 'card-img__wrapper');
  const img = createElemWithClass('img', 'card__img');
  img.loading = 'lazy';
  img.width = '420';
  img.height = '295';
  img.src = createImageSRC(image);
  wrapIMG.append(img);

  const wrapPrice = createElemWithClass('div', 'card__price');
  const priceFinal = createElemWithClass('span', 'card__sale-price');
  priceFinal.textContent = `${price} ₽`;

  if (discount) {
    const saleIcon = createSaleIcon('span', 'card__sale', discount);
    wrapIMG.append(saleIcon);
    const priceStart = createElemWithClass('span', 'card__start-price');
    priceStart.textContent = `${price} ₽`;
    priceFinal.textContent = getPriceFinal(price, discount) + ' ₽';
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

const createCatalog = (data, catalogName) => {
  const catalogList = data.map(item => createCatalogItem(item));
  const list = createElemWithClass('ul', 'benefit__list');
  list.append(...catalogList);
  return list;
};

// ==================  CARD page ========================

const createImgCard = ({discount, image}) => {
  const imgBox = createElemWithClass('div', 'good-card__img-box');
  const img = createElemWithClass('img', 'good-card__img');
  // img.width = '420';
  // img.height = '295';
  img.src = createImageSRC(image);
  imgBox.append(img);

  if (discount) {
    const saleIcon = createSaleIcon('div', 'sale good-card__sale', discount);
    imgBox.append(saleIcon);
  }
  return imgBox;
};

const createCart = ({price: priceStart, discount}) => {
  const cart = createElemWithClass('div', 'good-card__price good-price');

  cart.insertAdjacentHTML('afterbegin',
      `     
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

  const priceFinalElem = createElemWithClass('span', 'good-price__title');
  priceFinalElem.textContent = `${formatPriceFinal} ₽`;
  cart.prepend(priceFinalElem);

  if (discount) {
    const priceStartElem = createElemWithClass('span', 'good-price__old-title');
    priceStartElem.textContent = `${formatPriceStart} ₽`;
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

const createCard = (data) => {
  const titlePage = createElemWithClass('h1', 'good-card__title');
  titlePage.textContent = data.title;

  const cart = createCart(data);
  const img = createImgCard(data);
  const wrapCard = createElemWithClass('div', 'good-card__wrap');
  wrapCard.append(img, cart);

  const {title: titleDescript, content} = createDescript(data);

  return {titlePage, wrapCard, titleDescript, content};
};

const createRecommend = (data) => {
  console.warn(data);
  const titleRecommend = createElemWithClass('p', 'recommend__title');
  titleRecommend.textContent = 'Рекомендуем также';
  const wrapRecommend = createElemWithClass('div', 'recommend__wrap');
  const listRecommend = createCatalog(data);
  wrapRecommend.append(listRecommend);
  return {titleRecommend, wrapRecommend}
};

// ===================  CART page ========================

const createCartListPrice = (cartListItem, price, discount, count) => {
  console.warn(count);
  if (count === '-') count = 0;

  const priceStart = formatPrice(price * count);
  const priceFinal = formatPrice(getPriceFinal(price * count, discount));

  const cartListPrice = cartListItem.querySelector('.cart-list__price');
  cartListPrice.innerHTML = '';
  if (discount) {
    cartListPrice.insertAdjacentHTML('afterbegin',
        `<p class="cart-list__priceFinal">${priceFinal} ₽</p>
          <p class="cart-list__priceStart">${priceStart} ₽</p>
          <p class="cart-list__credit">В кредит от 5600 ₽ </p>
    `);
  } else {
    cartListPrice.insertAdjacentHTML('afterbegin', 
        `          
        <p class="cart-list__priceFinal">${priceStart} ₽</p>
          <p class="cart-list__credit">В кредит от 5600 ₽ </p>
    `);
  }
};

const createCartListItem = ({title, price, image, discount, category, id}, count) => {
  // const priceStart = formatPrice(price * count);
  // const priceFinal = formatPrice(getPriceFinal(price * count, discount));

  const cartListItem = createElemWithClass('li', 'cart-list__item');
  cartListItem.dataset.name = id;
  cartListItem.insertAdjacentHTML('afterbegin',
      `
      <div class="cart-list__wrap-input">
        <input class="cart-list__input" type="checkbox" name="" id="">
        <div class="cart-list__img">
          <img  src=https://determined-painted-hawthorn.glitch.me/${image} alt="" >
        </div>
      </div>
            
      <div class="cart-list__info">
        <div class="cart-list__content">
          <a href="card.html#${category}#${id}" class="cart-list__title">${title}</a>
          
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
  createCartListPrice(cartListItem, price, discount, count)

  return cartListItem;
}

const createDeliveryImg = ({image, id}) => {
  const wrapImg = createElemWithClass('div', 'delivery__box-img');
  wrapImg.dataset.img = id;

  const img = createElemWithClass('img', 'delivery__img');
  img.src = createImageSRC(image);
  wrapImg.append(img);
  return wrapImg;
};

export {getTimeInner, createMenuItem, createCatalog,
  createCard, createDescript, createRecommend, createElemWithClass,
  createCartListItem, createDeliveryImg, createCartListPrice};
