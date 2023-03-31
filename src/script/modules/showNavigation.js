export const showNavigation = () => {
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

export const showHeaderMenu = () => {
  
  const menuBtn = document.querySelector('.menu');
  menuBtn.addEventListener('click', () => {
    document.querySelector('.header-nav').classList.toggle('header-nav_active')
  })
}
