import { addInLocalStorage, getLocalStorage, clearLocalStorage } from './localStorageCart.js';
import { fetchGoods } from './fetchCard.js';
import { formatCartPrice } from './createCatalog&Cards.js';

const CARTLIST = document.querySelector('.cart-list');

const cart = getLocalStorage() || [];

const addItemInCart = (cart, dataGood) => {
  const indexGoodInCart = cart.findIndex(item => item.id === dataGood.id);
  console.log(dataGood);
  if (indexGoodInCart === -1) {
    cart.push({id: dataGood.id, count: 1, price: dataGood.price, discount: dataGood.discount});
    addInLocalStorage(cart);
  } else {
    cart[indexGoodInCart].count++;
    addInLocalStorage(cart);
  }
};

const showCountGoodInCart = () => {    
  const cart = getLocalStorage() || [];
  const countInCartBtn = document.querySelector('.btn-cart__count');
  let countInCart = 0;
  cart.forEach(elem => {  
    countInCart += Number(elem.count);
    
  });
  countInCartBtn.textContent = countInCart || '';
}

const addGoodInCart = (dataGood) => {    
  console.log(dataGood);
  const addInCartBtn = document.querySelector('.good-price__btn');
  addInCartBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      cart.push({id: dataGood.id, count: 1, price: dataGood.price, discount: dataGood.discount });
      addInLocalStorage(cart);      
      showCountGoodInCart();
    } else {
      const cart = getLocalStorage();      
      addItemInCart(cart, dataGood);
      showCountGoodInCart();
    }

    
  })
}

const renderCard = ({title, price, image, discount, category, id}, count) => {
  console.log(image);
  const priceStart = formatCartPrice(price * count);
  const priceFinal = formatCartPrice(Math.round((price * count * (100 - discount)) / 100));  

  const li = document.createElement('li');
  li.className = 'cart-list__item';
  li.dataset.name = id;
  li.insertAdjacentHTML('afterbegin',
      `
      <div class="cart-list__wrap-input">
        <input class="cart-list__input" type="checkbox" name="" id="">
        <div class="cart-list__img">
          <img  src=https://determined-painted-hawthorn.glitch.me/${image} alt="" >
        </div>
      </div>
            
      <div class="cart-list__info">
        <div class="cart-list__content">
          <a href="card.html#${category}#${id}" class="cart-list__title">${title}</a>
          
        </div>
        <div class="cart-list__count-control count">
          <buton class="count__btn count__btn_minus">−</buton>
          <span class="count__text">${count}</span>
          <buton class="count__btn count__btn_plus">+</buton>
        </div>
        <div class="cart-list__price">          
        </div>
      </div>      
      <button class="cart-list__cart"></button>
  `);
  const cartListPrice = li.querySelector('.cart-list__price');
  if (discount) {
    cartListPrice.insertAdjacentHTML('afterbegin',
        `<p class="cart-list__priceFinal">${priceFinal} ₽</p>
          <p class="cart-list__priceStart">${priceStart} ₽</p>
          <p class="cart-list__credit">В кредит от 5600 ₽ </p>
    `)
  } else {
    cartListPrice.insertAdjacentHTML('afterbegin', 
        `          
        <p class="cart-list__priceFinal">${priceStart} ₽</p>
          <p class="cart-list__credit">В кредит от 5600 ₽ </p>
    `);
  }
  return li;
}

const createDeliveryImg = ({image}) => {
  const wrapImg = document.createElement('div');
  wrapImg.className = 'delivery__box-img';

  const img = document.createElement('img');
  img.className = 'delivery__img';
  img.src = `https://determined-painted-hawthorn.glitch.me/${image}`;
  wrapImg.append(img);
  return wrapImg;
}

const renderShopPage = () => {
  
  const cartItems = getLocalStorage() || [];   
  console.log(cartItems);

  cartItems.forEach(async item => {
    const url = `https://determined-painted-hawthorn.glitch.me/api/goods/`;
    const data = await fetchGoods(url + item.id);     
    const liItem = renderCard(data, item.count);
    CARTLIST.append(liItem)

    const deliveryInfo = document.querySelector('.delivery__info-img');
    const deliveryImg = createDeliveryImg(data);
    
    deliveryInfo.append(deliveryImg);
  })
}

const makeAllSum = () => {
  const cart = getLocalStorage();
  let count = 0;
  let sum = 0;
  let saleSum = 0;
  cart.forEach(elem => {
    console.log(elem)
    count += elem.count;
    sum += (elem.count * elem.price);    
    saleSum  += (elem.price - Math.round((elem.price * (100 - elem.discount)) / 100)) * elem.count    
  })

  const totalSumFinal = document.querySelector('.total__sumFinal');
  const spanCount = document.querySelector('.span__count');
  const totalSumStart = document.querySelector('.total__sumStart');
  const totalSale = document.querySelector('.total__sale');

  totalSumFinal.textContent = formatCartPrice(String(sum - saleSum)) + ' ₽';
  spanCount.textContent = count;
  totalSale.textContent = formatCartPrice(String(saleSum)) + ' ₽';
  totalSumStart.textContent = formatCartPrice(String(sum)) + ' ₽';



  console.warn(count);
  console.warn(sum);
  console.warn(saleSum);
}

const controlCountBtn = () => {      
  CARTLIST.addEventListener('click', async ({target}) => {
    console.log(target)
    if (target.classList.contains('count__btn_plus')) {     
      const currentRow = target.closest('.cart-list__item'); 
      const currentCountBtn = target.previousElementSibling;
      const fieldPriceFinally = currentRow.querySelector('.cart-list__priceFinal')
      const fieldPriceStart = currentRow.querySelector('.cart-list__priceStart')

      const goodID = currentRow.dataset.name;
      const cart = getLocalStorage();
      console.log(cart);
      const indexGoodInCart = cart.findIndex(item => item.id === goodID);            
      console.log('index:', indexGoodInCart);
      let count;
      if (currentCountBtn.textContent === '-') {
        count = 1;
      } else {
        count = currentCountBtn.textContent;
        count++;
      }
        currentCountBtn.textContent = count;
        
        if (indexGoodInCart == '-1') {
          const goodID = currentRow.dataset.name;
          cart.push({'id': goodID, 'count': 1})          
        } else {
          cart[indexGoodInCart].count = +currentCountBtn.textContent;
        }
        
        addInLocalStorage(cart);
        const url = `https://determined-painted-hawthorn.glitch.me/api/goods/${goodID}`;
        const dataGood = await fetchGoods(url);
  
        if (dataGood.discount) {
          const price = dataGood.price;
          console.log(price);  
          const priceStart = formatCartPrice(dataGood.price * count);
          const priceFinal = formatCartPrice(Math.round((dataGood.price * count * (100 - dataGood.discount)) / 100));  
          fieldPriceFinally.textContent = priceFinal;
          fieldPriceStart.textContent = priceStart
        } else {
          const price = dataGood.price;
          console.log(price);          
          const priceFinal = formatCartPrice(dataGood.price * count);        
          fieldPriceFinally.textContent = priceFinal
        }

    } else if (target.classList.contains('count__btn_minus')) {
     
      const currentRow = target.closest('.cart-list__item'); 
      console.log(currentRow);
      const currentCountBtn = target.nextElementSibling;
      const fieldPriceFinally = currentRow.querySelector('.cart-list__priceFinal')
      const fieldPriceStart = currentRow.querySelector('.cart-list__priceStart')
      let count = currentCountBtn.textContent; 
      count--;
      
      if (count > 0) {
        currentCountBtn.textContent = count;
        const goodID = currentRow.dataset.name;
        const cart = getLocalStorage();
        const indexGoodInCart = cart.findIndex(item => item.id === goodID);
        cart[indexGoodInCart].count = +currentCountBtn.textContent;
        addInLocalStorage(cart);
        const url = `https://determined-painted-hawthorn.glitch.me/api/goods/${goodID}`;
        const dataGood = await fetchGoods(url);
  
        if (dataGood.discount) {
          const price = dataGood.price;
          console.log(price);  
          const priceStart = formatCartPrice(dataGood.price * count);
          const priceFinal = formatCartPrice(Math.round((dataGood.price * count * (100 - dataGood.discount)) / 100));  
          fieldPriceFinally.textContent = priceFinal;
          fieldPriceStart.textContent = priceStart
        } else {
          const price = dataGood.price;
          console.log(price);          
          const priceFinal = formatCartPrice(dataGood.price * count);        
          fieldPriceFinally.textContent = priceFinal
        }
      } else {
        currentCountBtn.textContent = '-';
        const goodID = currentRow.dataset.name;
        const cart = getLocalStorage();
        const indexGoodInCart = cart.findIndex(item => item.id === goodID);
        if (indexGoodInCart >= 0) {
          cart.splice(indexGoodInCart, 1);
          addInLocalStorage(cart);
          fieldPriceFinally.textContent = '';
          fieldPriceStart.textContent = '';
        }        
        
        

      }
      

    }
    showCountGoodInCart();
    makeAllSum();
  })
}

const onClickCartDelete = () => {
  document.querySelector('.shop').innerHTML = '';
    renderConfirmDeleteModal()
    delFromImgCart();
    const btnAllDel = document.querySelector('.cart__btn-deleteall');
    btnAllDel.removeEventListener('click', onClickCartDelete)

}

const renderConfirmDeleteModal = () => {
  const div = document.createElement('div');    
  div.style.cssText = `
    display: flex;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    height: 200px;
    width: 400px;
    z-index: 100;
    font-size: 32px;
    font-weight: bold;
    border: 2px solid #3670c7;      
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    `;
  div.textContent = 'Корзина очищена';
  
  document.querySelector('.shop').prepend(div);
  setTimeout(() => {
    div.remove();
  }, 2000)
  
};

const delFromImgCart = () => {
  document.querySelector('.btn-cart__count').innerHTML = '';
}

const ctrlDeleteAll = () => {
  const btnCheckAll = document.querySelector('.cart__input-checkall');
  btnCheckAll.addEventListener('click', () => {
    if (btnCheckAll.checked) {      
      const cartListInput = CARTLIST.querySelectorAll('.cart-list__input');
      cartListInput.forEach(elem => elem.checked = true)
      console.log('true');
      const btnAllDel = document.querySelector('.cart__btn-deleteall');
      btnAllDel.addEventListener('click', onClickCartDelete);
      clearLocalStorage()  
    } else {
      console.log('++++');
      const cartListInput = CARTLIST.querySelectorAll('.cart-list__input');
      cartListInput.forEach(elem => elem.checked = false)
    }
  })
  

  


}


const shopControl = () => {    
  renderShopPage();
  showCountGoodInCart();
  controlCountBtn();
  makeAllSum();
  ctrlDeleteAll()
}

export {shopControl, renderShopPage, showCountGoodInCart, addGoodInCart};
