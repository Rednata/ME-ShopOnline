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
  const url = new URL(document.location);
  url.pathname = 'catalog.html';
  url.hash = `#${item}`;
  link.textContent = item;
  link.href = url;

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
  title.className = 'card__title';
  title.textContent = category;
  return title;
};

const createCategoryItem = (id, title, price, image, discount, category) => {
  const li = document.createElement('li');
  li.className = 'benefit__item card';
  li.dataset.name = id;
  const url = new URL(document.location);
  url.pathname = 'card.html';
  url.hash = `#${category}#${id}`;

  li.insertAdjacentHTML('afterbegin',
      `<a class="benefit__link" href=${url}>
          <div class="card-img__wrapper">          
              <img loading="lazy" class="card__img" src='https://determined-painted-hawthorn.glitch.me/${image}' width="420" height="295">                    
          </div>
          <div class="card__price">
            <span class="card__sale-price">${price} ₽</span>            
          </div>
          <p class="card__title">${title}</p>
        </a>
      `);
  if (image === 'image/notimage.jpg') {
    const img = li.querySelector('img');
    img.src = 'assets/images/no-photo.jpg';
  }

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
    cardPrice.firstElementChild.textContent = Math.round((price * (100 - discount)) / 100) + ' ₽'
    cardPrice.append(spanPriceStart);
  }

  return li;
};

const createCategoryList = (categoriesData) => {
  const categoriesItem = categoriesData.map(({ id, title, price, image, discount, category }) => createCategoryItem(id, title, price, image, discount, category));
  const ul = document.createElement('ul');
  ul.className = 'benefit__list';
  ul.append(...categoriesItem);
  return ul;
};

const createBreadTitle = (title) => {
  const breadCrumb = document.querySelector('.nav-breadcrumb');
  breadCrumb.lastElementChild.querySelector('a').textContent = title;
};


const createPriceTitle = (price) => {
  const last = price % 1000;
  const first = Math.trunc(price / 1000);
  return String(first) + ' ' + (last || '000');
};

const createCart = ({price, discount}) => {  
  let salePrice = Math.round((price * (100 - discount)) / 100);
  if (String(salePrice).length >= 4) {
    const priceTitle = createPriceTitle(salePrice);
    salePrice = priceTitle;
  }
  if (String(price).length >= 4) {
    const priceTitle = createPriceTitle(price);
    price = priceTitle;
  };

  const cart = document.createElement('div');
  cart.className = 'good-card__price good-price';

  cart.insertAdjacentHTML('afterbegin',
      `
        <span class="good-price__title">${salePrice} ₽</span>        
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
  if (discount) {
    const sale = document.createElement('span');
    sale.className = 'good-price__old-title';
    sale.textContent = `${price} ₽`;
    cart.querySelector('span').after(sale);
  }

  return cart;
};

const createCard = ({title, image, discount} ) => {
  const sectionTitle = document.createElement('h1');
  sectionTitle.className = 'good-card__title';
  sectionTitle.textContent = title;

  const cardWrap = document.createElement('div');
  cardWrap.className = 'good-card__wrap';
  if (discount) {
    cardWrap.insertAdjacentHTML('afterbegin',
        `
          <div class="good-card__img-box">          
            <img src='https://determined-painted-hawthorn.glitch.me/${image}'>          
            <div class="sale good-card__sale">-${discount}%</div>
          </div>
        `);
  } else {
    cardWrap.insertAdjacentHTML('afterbegin',
        `
          <div class="good-card__img-box">          
            <img src='https://determined-painted-hawthorn.glitch.me/${image}'>                     
          </div>
        `);
  }
  
  return {sectionTitle, cardWrap};
};

const createDescription = (descript) => {
  const title = document.createElement('h2');
  title.className = 'good-card__subtitle';
  title.textContent = 'Описание:';
  const elemDescript = document.createElement('p');
  elemDescript.className = 'good-card__description';
  elemDescript.textContent = descript;
  return {title, elemDescript};
};

const createRecommend = (list) => {
  const recommendSection = document.querySelector('.recommend');
  recommendSection.innerHTML = '';
  recommendSection.insertAdjacentHTML('afterbegin',
      `
        <p class="recommend__title">
          Рекомендуем также
        </p>
        <div class="recommend__wrap">
          
        </div>
      `);
  return (recommendSection.querySelector('.recommend__wrap')).append(list);
};

const loadPageGood = async () => {
  const documentLocation = (document.location.hash);
  const temp = documentLocation.split('#');
  const title = decodeURI(temp[1]);
  const itemID = temp[2];
  const url = `https://determined-painted-hawthorn.glitch.me/api/goods/${itemID}`;
  const item = await fetchGoods(url);
  console.log('item: ', item);
  

  createBreadTitle(title);
  const cart = createCart(item);
  const {sectionTitle, cardWrap} = createCard(item);
  cardWrap.append(cart);
  const {title: titleDescript, elemDescript} = createDescription(item.description);

  const urlCategories = `https://determined-painted-hawthorn.glitch.me/api/goods/category/${title}`;
  const categoriesData = await fetchGoods(urlCategories);
  
  const recommendList = createCategoryList(categoriesData);
  console.log(recommendList);
  const recommendSection = document.querySelector('.recommend');
  // recommendSection.innerHTML = '';
  recommendSection.insertAdjacentHTML('afterbegin',
      `
        <p class="recommend__title">
          Рекомендуем также
        </p>
        <div class="recommend__wrap">
          
        </div>
      `);
  // const recommend = createRecommend(recommendList);

  (recommendSection.querySelector('.recommend__wrap')).append(recommendList)

  const section = document.querySelector('.good-card');
  section.innerHTML = '';
  section.append(sectionTitle, cardWrap, titleDescript, elemDescript);
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      
  //     console.log(e.target);
      // console.log(card);
      // e.preventDefault();
      // const category = (document.querySelector('.card__title')).textContent;
      // const hash = card.dataset.name;
      // const url = new URL(document.location);
      // url.pathname = 'card.html';
      // url.hash = `${category}#${hash}`;

      // window.open(url);
      // loadPageGood();
    });
  });
};

const getGoodLink = () => {
  console.log('GoodLINK');
  const list = document.querySelector('.benefit__list');
  console.log(list);
  const cards = document.querySelectorAll('.card');
  console.warn(cards);

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      console.log(card);
      e.preventDefault();
      const category = (document.querySelector('.card__title')).textContent;
      const hash = card.dataset.name;
      const url = new URL(document.location);
      url.pathname = 'card.html';
      url.hash = `${category}#${hash}`;

      window.open(url);
      loadPageGood();
    });
  });
};

const loadPageCatalog = async () => {
  const category = decodeURI((document.location.hash).slice(1));
  const categorySection = document.querySelector('.category__container');
  categorySection.innerHTML = '';
  const url = `https://determined-painted-hawthorn.glitch.me/api/goods/category/${category}`;
  const categoriesData = await fetchGoods(url);

  const title = createSectionTitle(category);
  const categoryList = createCategoryList(categoriesData);
  categorySection.append(title, categoryList);
  getGoodLink();
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
        console.warn('url: ', url);

        url.pathname = `catalog.html`;
        url.hash = hash;

        window.open(url);
        loadPageCatalog();
      }
    });
  });
};

export {makeMenu, getCategoryLink, loadPageCatalog, loadPageGood, getGoodLink};
