export const showNavigation = () => {
  const NAV_TITLE_CATALOG = document.querySelectorAll('.nav__item_catalog .nav__title')
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

export const onClickHeaderBtnMenu = () => {
  const MENU_BTN = document.querySelector('.menu');
  const MENU_BTN_IMG = MENU_BTN.querySelector('.menu__img');
  MENU_BTN.addEventListener('click', () => {
    document.querySelector('.header-nav').classList.toggle('header-nav_active');
    MENU_BTN_IMG.classList.toggle('menu__img-active');
  });
};
