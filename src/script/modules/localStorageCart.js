const addInLocalStorage = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
};

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem('cart'));

export {addInLocalStorage, getLocalStorage};

