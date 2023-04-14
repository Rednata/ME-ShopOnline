import { getHashFromURL } from './fetchCard.js';
//   НЕ ПОНимаю, как и почему работает =================
const openCatalogPage = () => {
  const cataloges = document.querySelectorAll('.sublist_catalog');

  cataloges.forEach(catalog => {
    catalog.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;
      if (target.closest('.sublist__link')) {
        const category = target.textContent;
        const urlCurrent = new URL(document.location);
        const urlCatalog = new URL('catalog.html', urlCurrent);
        window.open(`${urlCatalog}#${category}`);
      }
    });
  });
};

const openCardPage = () => {
  const categoryHash = getHashFromURL();
  const hashIndex = categoryHash.indexOf('#');
  const category = categoryHash.slice(0, hashIndex);

  const benefitList = document.querySelector('.benefit__list');

  benefitList.addEventListener('click', (e) => {
 
    const target = e.target; 
   
    if (target.closest('.benefit__item')) {
      e.preventDefault();
      const good = target.closest('.benefit__item');
      const goodID = good.dataset.name;
      
      console.log('target: ', target);

      const urlCurrent = new URL(document.location);
      const urlCard = new URL('card.html', urlCurrent);

      window.open(`${urlCard}#${category}#${goodID}`);
    }
  });
};

export {openCatalogPage, openCardPage};
