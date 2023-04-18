import { getLocalStorage } from './localStorageCart.js';

const getHashFromURL = () => {
  const url = decodeURI(document.location.hash);
  return url.slice(1);
};

const createImageSRC = (image) => {
  if (image === 'image/notimage.jpg') {
    console.log('noimage');
    return 'assets/images/no-photo.jpg';
  } else {
    return `https://determined-painted-hawthorn.glitch.me/${image}`;
  }
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

export {getHashFromURL, createImageSRC, getPriceFinal, formatPrice, getCountGoodInCart,  getIndexGoodInLocalStorage, fromStrFormatToNumber };
