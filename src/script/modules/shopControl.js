import { addInLocalStorage, getLocalStorage } from './localStorageCart.js';

const cart = getLocalStorage() || [];

const addItemInCart = (cart, dataGood) => {
  const indexGoodInCart = cart.findIndex(item => item.title === dataGood.title);
  if (indexGoodInCart === -1) {
    cart.push({title: dataGood.title, count: 1});
    addInLocalStorage(cart);
  } else {
    cart[indexGoodInCart].count++;
    addInLocalStorage(cart);
  }
};

const shopControl = (dataGood) => {
  const addInCartBtn = document.querySelector('.good-price__btn');

  addInCartBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      cart.push({title: dataGood.title, count: 1});
      addInLocalStorage(cart);
    } else {
      const cart = getLocalStorage();
      console.warn(cart);
      addItemInCart(cart, dataGood);

      // addInLocalStorage(cart);
    };
});
}

export {shopControl};
