const getHashFromURL = () => {
  const url = decodeURI(document.location.hash);
  return url.slice(1);
};

const createImageSRC = (image) => {
  console.dir(image);
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


export {getHashFromURL, createImageSRC, getPriceFinal, formatPrice};
