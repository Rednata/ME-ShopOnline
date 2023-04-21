import { addInLocalStorage, getLocalStorage, clearLocalStorage } from './localStorageCart.js';
import { showCountGoodInCart } from './render.js';

import { fetchGoods } from './fetchCard.js';
import { formatPrice, getHashFromURL, imitationChangeGoodInCart, getIndexGoodInLocalStorage, fromStrFormatToNumber, getPriceFinal } from './commonFunction.js';
import { createCartListPrice } from './createElements.js';

const CARTLIST = document.querySelector('.cart-list');

const saveGoodInCart = (localStorageCart, data, ind) => {
  if (ind === -1) {
    const newObj = {id: data.id, count: 1, price: data.price, discount: data.discount};
    localStorageCart.push(newObj);
  } else {
    localStorageCart[ind].count++;
  }
  addInLocalStorage(localStorageCart);
};

const taskOnClickAddInCartBtn = async () => {
  const localStorageCart = getLocalStorage() || [];
  const id = getHashFromURL('id');
  const urlItem = `/goods/${id}`;
  const data = await fetchGoods(urlItem);
  const ind = getIndexGoodInLocalStorage(localStorageCart, id);

  saveGoodInCart(localStorageCart, data, ind);
  showCountGoodInCart();
}

const onClickAddInCartBtn = () => {
  const addInCartBtn = document.querySelector('.good-price__btn');
  addInCartBtn.addEventListener('click', taskOnClickAddInCartBtn);
}

const getCurrentRow = (target) => target.closest('.cart-list__item');

const changeCurrentCount = (elem, sign) => {
  if (sign === 'plus') {
    const currentCountElem = elem.previousElementSibling;
    const currentCount = currentCountElem.textContent;
    if (currentCount === '-') {
      currentCountElem.textContent = 1;
    } else {
      currentCountElem.textContent = +currentCount + 1;
    }
    return currentCountElem.textContent;
  } else if (sign === 'minus') {
    const currentCountElem = elem.nextElementSibling;
    const currentCount = currentCountElem.textContent;
    if (currentCount >= 2) {
      currentCountElem.textContent = +currentCount - 1;
    } else {
      currentCountElem.textContent = 0;
    }
    return currentCountElem.textContent;
  }
};

const getIdFromItem = (row) => row.dataset.name;

const getDataItem = async (id) => {
  const urlParam = `/goods/${id}`;
  const data = await fetchGoods(urlParam);
  return data;
};

const changeTotalSum = () => {
  const localStorageCart = getLocalStorage() || [];
  let priceFinal = 0;
  let priceStart = 0;
  localStorageCart.forEach(({price, count, discount}) => {
    priceStart += price * count;
    priceFinal += getPriceFinal(price, discount) * count;
  })
  document.querySelector('.total__sumFinal').textContent = formatPrice(priceFinal) + ' ₽';
  document.querySelector('.total__sumStart').textContent = formatPrice(priceStart) + ' ₽';
  document.querySelector('.total__sale').textContent = formatPrice(priceStart - priceFinal) + ' ₽';
};

const removeImgFromDelivery = (id) => {
  const imagesNode = document.querySelectorAll('.delivery__box-img');
  const imagesArr = Array.from(imagesNode);
  const currentImg = imagesArr.find(img => img.dataset.img === id);
  currentImg.closest('.delivery__box-img').remove();
}

const controlCountBtn = () => {
  CARTLIST.addEventListener('click', async ({target}) => {
    let count;
    if (target.classList.contains('count__btn_plus')) {
      count = changeCurrentCount(target, 'plus');

      //   =======  ДУБЛИРУЕТСЯ =================

      const currentRow = getCurrentRow(target);
      const id = getIdFromItem(currentRow);
      const data = await getDataItem(id);

      createCartListPrice(currentRow, data.price, data.discount, count);
  
      const localStorageCart = getLocalStorage();
  
      const ind = getIndexGoodInLocalStorage(localStorageCart, id);            
      localStorageCart[ind].count = +count;
      addInLocalStorage(localStorageCart);
      showCountGoodInCart('shop');
  
      changeTotalSum();

    } else if (target.classList.contains('count__btn_minus')) {
      count = changeCurrentCount(target, 'minus');

      //   =======  ДУБЛИРУЕТСЯ =================
      const currentRow = getCurrentRow(target);
      const id = getIdFromItem(currentRow);
      const data = await getDataItem(id);
      const localStorageCart = getLocalStorage();
      const ind = getIndexGoodInLocalStorage(localStorageCart, id);
   
      if (count == 0) {
        currentRow.remove();
        localStorageCart.splice(ind, 1);
        removeImgFromDelivery(id);
      } else {
        createCartListPrice(currentRow, data.price, data.discount, count);
        localStorageCart[ind].count = +count;
        // showCountGoodInCart('shop');
        // changeTotalSum();
      }

      addInLocalStorage(localStorageCart);
      showCountGoodInCart('shop');
      changeTotalSum();
      
  
      
  
      // const ind = getIndexGoodInLocalStorage(localStorageCart, id);

      
    }
  });
};



const controlDelOneItem = () => {
  CARTLIST.addEventListener('click', ({target}) => {
    if (target.classList.contains('cart-list__cart')) {
      const currentRow = getCurrentRow(target);
      const currentCheckbox = currentRow.querySelector('.cart-list__input');
      if (currentCheckbox.checked) {
        const localStorageCart = getLocalStorage();
        const id = getIdFromItem(currentRow);
        const index = getIndexGoodInLocalStorage(localStorageCart, id);

        localStorageCart.splice(index, 1);
        addInLocalStorage(localStorageCart);
        showCountGoodInCart('shop');
        changeTotalSum();
        currentRow.remove();
        removeImgFromDelivery(id);
      }
    }
  });
};

const controlDelSomeItems = () => {
  const delSomeItemsBtn = document.querySelector('.cart__btn-deleteall');
  delSomeItemsBtn.addEventListener('click', () => {
    const allItems = Array.from(document.querySelectorAll('.cart-list__input'));
    const checkedItems = allItems.filter(elem => elem.checked);

    checkedItems.forEach(item => {
      const currentRow = getCurrentRow(item);
      const localStorageCart = getLocalStorage();
      const id = getIdFromItem(currentRow);
      const index = getIndexGoodInLocalStorage(localStorageCart, id);

      localStorageCart.splice(index, 1);
      addInLocalStorage(localStorageCart);
      showCountGoodInCart('shop');
      changeTotalSum();
      currentRow.remove();
      removeImgFromDelivery(id);
    });
  });
};

const onClickAllCheckedBtn = () => {
  const allCheckedBtn = document.querySelector('.cart__input-checkall');
  
  allCheckedBtn.addEventListener('click', () => {

    const allItems = Array.from(document.querySelectorAll('.cart-list__input'));
    if (allCheckedBtn.checked) {
      allItems.forEach(item => {
        item.checked = true;
      })
    } else {
      allItems.forEach(item => item.checked = false);
    }
  })

};

const shopControl = () => {
  controlCountBtn();
  changeTotalSum();
  controlDelOneItem();
  controlDelSomeItems();
  onClickAllCheckedBtn();
};

export {shopControl, onClickAddInCartBtn, changeTotalSum};
