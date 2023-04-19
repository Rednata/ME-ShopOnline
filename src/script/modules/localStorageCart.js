const addInLocalStorage = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
  console.log(data);
};

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem('cart'));

  const clearLocalStorage = () => {
    localStorage.clear();
  }

export {addInLocalStorage, getLocalStorage, clearLocalStorage};

