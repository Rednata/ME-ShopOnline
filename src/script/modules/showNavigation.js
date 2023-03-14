export const showNavigation = () => {
  const navTitleCatalog = document.querySelector('.nav__item_catalog').firstElementChild;
  const navTitleBuyer = document.querySelector('.nav__item_buyer').firstElementChild;
  const catalog = document.querySelector('.sublist_catalog');
  const buyer = document.querySelector('.sublist_buyer');

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
