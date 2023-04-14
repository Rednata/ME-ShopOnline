import {createHrefLink} from './fetchCard.js'

const createElemWithClass = (elem, className) => {
  const elemClass = document.createElement(elem);
  elemClass.className = className;
  return elemClass;
};











const createRecommend = (data) => {
  const titleRecom = createElemWithClass('p', 'recommend__title');
  titleRecom.textContent = 'Рекомендуем также';
  const wrapRecom = createElemWithClass('div', 'recommend__wrap');
  const listRecommend = createCatalog(data);
  wrapRecom.append(listRecommend);
  return {titleRecom, wrapRecom}
};

export { createElemWithClass, createRecommend};
