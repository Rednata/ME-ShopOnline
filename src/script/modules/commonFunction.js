import { getLocalStorage } from './localStorageCart.js';

const getHashFromURL = (search1, search2) => {
  const url = new URL(window.location.href);
  if (search2) {
    return [url.searchParams.get(search1), url.searchParams.get(search2)];
  } else return url.searchParams.get(search1);
};

const getPriceFinal = (price, discount) =>
  Math.round((price * (100 - discount)) / 100);

const formatPrice = (price) => {
  if (String(price).length >= 4) {
    const last = price % 1000;
    const first = Math.trunc(price / 1000);
    return String(first) + ' ' + (String(last).padStart(3, '0') || '000');
  } else {
    return price;
  }
};

const getCountGoodInCart = () => {
  const cart = getLocalStorage() || [];
  const countInCart = cart.reduce((acc, elem) => acc + Number(elem.count), 0) || '';
  return countInCart;
}

const getIndexGoodInLocalStorage = (localStorageCart, id) =>
  localStorageCart.findIndex(item => item.id === id);

const fromStrFormatToNumber = (str) => Number(str.match(/\d/g).join(''));  

export {getHashFromURL, getPriceFinal, formatPrice, getCountGoodInCart,  getIndexGoodInLocalStorage, fromStrFormatToNumber };
