import { getHashFromURL } from './commonFunction.js';
import { renderCatalog, renderPageCard } from './render.js';

const CATALOGS = document.querySelectorAll('.sublist_catalog');

const openCatalogPage = () => {
  CATALOGS.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;
      if (target.closest('.sublist__link')) {
        const category = target.textContent;
        location.href = `catalog.html?category=${category}`;
        renderCatalog();
      }
    });
  });
};

const openCardPage = () => {
  const category = getHashFromURL('category');
  const benefitList = document.querySelector('.benefit__list');

  benefitList.addEventListener('click', (e) => {
    const target = e.target;
   
    if (target.closest('.benefit__item')) {
      e.preventDefault();

      const good = target.closest('.benefit__item');
      const goodID = good.dataset.name;

      location.href = `card.html?category=${category}&id=${goodID}`;
      renderPageCard();
    }
  });
};

export {openCatalogPage, openCardPage};
