/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script/modules/createElements.js":
/*!**********************************************!*\
  !*** ./src/script/modules/createElements.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTimeInner": () => (/* binding */ getTimeInner)
/* harmony export */ });
const getTimeInner = (timeDuration) => {
  console.log('++++');
  timeDuration.insertAdjacentHTML('afterbegin',
      ` <p class="time__title">
      До конца акции:
    </p>
    <div class="time__duration">
      <div class="time__show time__show_days">
        <p class="time__digital digital__day"></p>
      <p class="time__alpha alpha__day"></p>
      </div>
      <div class="time__show time__show_hours">
        <p class="time__digital digital__hour"></p>
        <p class="time__alpha alpha__hour"></p>
      </div>
      <div class="time__show time__show_minutes">
        <p class="time__digital digital__minute"></p>
        <p class="time__alpha alpha__minute"></p>
      </div>
      <div class="time__show time__show_seconds">
        <p class="time__digital digital__second"></p><p class="time__alpha alpha__second"></p>
      </div>                        
    </div> `,
  );
  return timeDuration;
};





/***/ }),

/***/ "./src/script/modules/functionTimer.js":
/*!*********************************************!*\
  !*** ./src/script/modules/functionTimer.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDeadline": () => (/* binding */ getDeadline),
/* harmony export */   "timerStart": () => (/* binding */ timerStart)
/* harmony export */ });
/* harmony import */ var _getNames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNames.js */ "./src/script/modules/getNames.js");


const getDeadline = (timeDuration) =>
  new Date(timeDuration.dataset.timerDeadline).getTime();


const getTimeRemaining = (timeRemaining) => {
  const seconds = Math.trunc(timeRemaining % 60);
  const minutes = Math.trunc(timeRemaining / 60 % 60);
  const hours = Math.trunc(timeRemaining / 60 / 60 % 24);
  const days = Math.trunc(timeRemaining / 60 / 60 / 24);

  return { seconds, minutes, hours, days };
};

const isShowDaysOrSeconds = (timeRemaining) => {
  const timeShowSeconds = document.querySelector('.time__show_seconds');
  const timeShowDays = document.querySelector('.time__show_days');

  if ( timeRemaining <= (24 * 60 * 60) ) {
    timeShowDays.classList.add('display_invisible');
    timeShowSeconds.classList.remove('display_invisible');
  } else {
    timeShowDays.classList.remove('display_invisible');
    timeShowSeconds.classList.add('display_invisible');
  }
};

const isTimerFinished = (timeRemaining, setIntervalId) => {
  if (timeRemaining <= 0) {
    const bannerTime = document.querySelector('.banner__time');
    clearInterval(setIntervalId);
    bannerTime.classList.add('display_invisible');
  }
};

const timerStart = (deadline) => {
  const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const digitalDay = document.querySelector('.digital__day');
  const digitalHour = document.querySelector('.digital__hour');
  const digitalMinute = document.querySelector('.digital__minute');
  const digitalSecond = document.querySelector('.digital__second');
  const alphaDay = document.querySelector('.alpha__day');
  const alphaHour = document.querySelector('.alpha__hour');
  const alphaMinute = document.querySelector('.alpha__minute');
  const alphaSecond = document.querySelector('.alpha__second');

  const setIntervalId = setInterval(() => {
    const now = Date.now() + timeZoneOffset;
    const timeRemaining = (deadline - now) / 1000;
    const timer = getTimeRemaining(timeRemaining);
    const { seconds, minutes, hours, days } = timer;

    alphaDay.textContent = (0,_getNames_js__WEBPACK_IMPORTED_MODULE_0__.getNameDays)(days);
    alphaHour.textContent = (0,_getNames_js__WEBPACK_IMPORTED_MODULE_0__.getNameHours)(hours);
    alphaMinute.textContent = (0,_getNames_js__WEBPACK_IMPORTED_MODULE_0__.getNameMinutes)(minutes);
    alphaSecond.textContent = (0,_getNames_js__WEBPACK_IMPORTED_MODULE_0__.getNameSeconds)(seconds);

    digitalDay.textContent = String(days).padStart(2, '0');
    digitalHour.textContent = String(hours).padStart(2, '0') ;
    digitalMinute.textContent = String(minutes).padStart(2, '0');
    digitalSecond.textContent = String(seconds).padStart(2, '0');

    isShowDaysOrSeconds(timeRemaining);
    isTimerFinished(timeRemaining, setIntervalId);
  }, 1000);
};




/***/ }),

/***/ "./src/script/modules/getNames.js":
/*!****************************************!*\
  !*** ./src/script/modules/getNames.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNameDays": () => (/* binding */ getNameDays),
/* harmony export */   "getNameHours": () => (/* binding */ getNameHours),
/* harmony export */   "getNameMinutes": () => (/* binding */ getNameMinutes),
/* harmony export */   "getNameSeconds": () => (/* binding */ getNameSeconds)
/* harmony export */ });
const getNameDays = (days) => {
  if (days % 10 === 1 && days !== 11) {
    return 'день';
  } else if ((days % 10 === 2 ||
                days % 10 === 3 ||
                days % 10 === 4) &&
                (days <= 5 || days >= 20)) {
    return 'дня';
  } else {
    return 'дней';
  }
};

const getNameHours = (hours) => {
  if (hours === 1 ||
      hours === 21) {
    return 'час';
  } else if ((hours >= 5 && hours <= 20) ||
              hours % 10 === 0) {
    return 'часов';
  } else {
    return 'часа';
  }
};

const getNameMinutes = (minutes) => {
  if (minutes % 10 === 1 &&
      minutes !== 11) {
    return 'минута';
  } else if ((minutes % 10 === 2 ||
                  minutes % 10 === 3 ||
                  minutes % 10 === 4) &&
                (minutes <= 5 || minutes >= 20)) {
    return 'минуты';
  } else {
    return 'минут';
  }
};

const getNameSeconds = (seconds) => {
  if (seconds % 10 === 1 &&
      seconds !== 11) {
    return 'секунда';
  } else if ((seconds % 10 === 2 ||
                  seconds % 10 === 3 ||
                  seconds % 10 === 4) &&
                (seconds <= 5 || seconds >= 20)) {
    return 'секунды';
  } else {
    return 'секунд';
  }
};




/***/ }),

/***/ "./src/script/modules/showNavigation.js":
/*!**********************************************!*\
  !*** ./src/script/modules/showNavigation.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showHeaderMenu": () => (/* binding */ showHeaderMenu),
/* harmony export */   "showNavigation": () => (/* binding */ showNavigation)
/* harmony export */ });
const showNavigation = () => {
  const navFooter = document.querySelector('.navFooter');
  const navTitleCatalog = navFooter.querySelector('.nav__item_catalog').firstElementChild;
  const navTitleBuyer = navFooter.querySelector('.nav__item_buyer').firstElementChild;

  const catalog = navFooter.querySelector('.sublist_catalog');
  const buyer = navFooter.querySelector('.sublist_buyer');

  navTitleCatalog.addEventListener('click', () => {
    catalog.classList.toggle('sublist_show');
    const btnCatalog = navTitleCatalog.querySelector('.nav__btn');
    btnCatalog.classList.toggle('nav__btn_open');
  });

  navTitleBuyer.addEventListener('click', () => {
    buyer.classList.toggle('sublist_show');
    const btnBuyer = navTitleBuyer.querySelector('.nav__btn');
    btnBuyer.classList.toggle('nav__btn_open');
  });
};

const showHeaderMenu = () => {
  const menuBtn = document.querySelector('.menu');
  menuBtn.addEventListener('click', () => {
    document.querySelector('.header-nav').classList.toggle('header-nav_active')
  })
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/script/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_createElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/createElements.js */ "./src/script/modules/createElements.js");
/* harmony import */ var _modules_functionTimer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/functionTimer.js */ "./src/script/modules/functionTimer.js");
/* harmony import */ var _modules_showNavigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/showNavigation.js */ "./src/script/modules/showNavigation.js");




const initTimer = () => {
  const timeDuration = document.querySelector('[data-timer-deadline]');  
  if (timeDuration) {
    (0,_modules_createElements_js__WEBPACK_IMPORTED_MODULE_0__.getTimeInner)(timeDuration);
    const deadline = (0,_modules_functionTimer_js__WEBPACK_IMPORTED_MODULE_1__.getDeadline)(timeDuration);
    (0,_modules_functionTimer_js__WEBPACK_IMPORTED_MODULE_1__.timerStart)(deadline);
  }
  (0,_modules_showNavigation_js__WEBPACK_IMPORTED_MODULE_2__.showNavigation)();
  (0,_modules_showNavigation_js__WEBPACK_IMPORTED_MODULE_2__.showHeaderMenu)();
};

initTimer();

})();

/******/ })()
;
//# sourceMappingURL=index.js.map