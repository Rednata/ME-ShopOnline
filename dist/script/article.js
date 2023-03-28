/*! For license information please see article.js.LICENSE.txt */
!function(){"use strict";var t=document.querySelector(".header"),e=document.querySelector("main"),n=document.createElement("div");n.classList.add("articleWrap","container");var r=function(t){var e=t.data.name||"",r=document.createElement("footer");r.classList.add("footer-article"),r.insertAdjacentHTML("afterbegin",'\n        <a class="footer-article__back" href="blog.html">К списку статей</a>\n          <div class="footer-article__about">\n          <div class="footer-article__author">\n            '.concat(e,'\n          </div>\n\n          <div class="info info_article">\n          <span class="info__date">22 октября 2021, 12:45</span>\n          <div class="info-wrap">\n            <div class="info__view">\n              <span class="info__img info__img_view"></span>\n              <p class="info__count">1.2K</p>              \n            </div>\n            <div class="info__comments">\n              <span class="info__img info__img_comments"></span>\n              <p class="info__count">0</p>              \n            </div>\n          </div>\n          </div> \n          \n        </div>\n      ')),n.append(r)},o=function(r){var o=r.title,i=r.body,a=r.user_id,c=function(t){var e=document.createElement("div");return e.classList.add("bread"),e.insertAdjacentHTML("afterbegin",'<ul class="nav-breadcrumb">\n          <li class="nav-breadcrumb__li">\n            <a class="nav-breadcrumb__main" href="index.html">Главная</a>\n          </li>\n          <li class="nav-breadcrumb__li">\n            <a class="goBlog" href="blog.html">Блог</a>\n          </li>\n          <li class="nav-breadcrumb__li nav-breadcrumb__title">'.concat(t,"\n          </li>      \n        </ul>\n      ")),e}(o),s=function(t,e){var n=document.createElement("section");return n.insertAdjacentHTML("afterbegin",'\n        <article class="article">\n          <h1 class="title article__title">'.concat(t,'</h1>\n          <p class="article__text">').concat(e,"</p>\n        </article>\n      ")),n}(o,i),u=function(){var t=document.createElement("aside");return t.className="aside",t.insertAdjacentHTML("afterbegin",'\n        <img src="assets/images/add.jpg" alt="" class="article__img">\n        <img src="assets/images/add.jpg" alt="" class="article__img">\n      '),t}();y(a),n.append(u,s),t.append(c),e.append(n)};function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function a(){a=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},c=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function f(t,e,n,o){var i=e&&e.prototype instanceof v?e:v,a=Object.create(i.prototype),c=new k(o||[]);return r(a,"_invoke",{value:x(t,n,c)}),a}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var d={};function v(){}function p(){}function y(){}var m={};l(m,c,(function(){return this}));var g=Object.getPrototypeOf,_=g&&g(g(O([])));_&&_!==e&&n.call(_,c)&&(m=_);var b=y.prototype=v.prototype=Object.create(m);function w(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function o(r,a,c,s){var u=h(t[r],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==i(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,c,s)}),(function(t){o("throw",t,c,s)})):e.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return o("throw",t,c,s)}))}s(u.arg)}var a;r(this,"_invoke",{value:function(t,n){function r(){return new e((function(e,r){o(t,n,e,r)}))}return a=a?a.then(r,r):r()}})}function x(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=E(a,n);if(c){if(c===d)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=h(t,e,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===d)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}function E(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),d;var o=h(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function O(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:q}}function q(){return{value:void 0,done:!0}}return p.prototype=y,r(b,"constructor",{value:y,configurable:!0}),r(y,"constructor",{value:p,configurable:!0}),p.displayName=l(y,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,u,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},w(L.prototype),l(L.prototype,s,(function(){return this})),t.AsyncIterator=L,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new L(f(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(b),l(b,u,"Generator"),l(b,c,(function(){return this})),l(b,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=O,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;j(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:O(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),d}},t}function c(t,e,n,r,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(r,o)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){c(i,r,o,a,s,"next",t)}function s(t){c(i,r,o,a,s,"throw",t)}a(void 0)}))}}var u,l,f,h,d,v,p=function(){var t=s(a().mark((function t(){var e,n,r,i;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new URL(window.location),n=e.search.slice(4),t.next=4,fetch("https://gorest.co.in/public-api/posts/".concat(n));case 4:return r=t.sent,t.next=7,r.json();case 7:i=t.sent,o(i.data);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),y=function(){var t=s(a().mark((function t(e){var n,o;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://gorest.co.in/public-api/users/".concat(e));case 2:return n=t.sent,t.next=5,n.json();case 5:o=t.sent,r(o);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();p(),u=document.querySelector(".navFooter"),l=u.querySelector(".nav__item_catalog").firstElementChild,f=u.querySelector(".nav__item_buyer").firstElementChild,h=u.querySelector(".sublist_catalog"),d=u.querySelector(".sublist_buyer"),l.addEventListener("click",(function(){h.classList.toggle("sublist_show"),l.querySelector(".nav__btn").classList.toggle("nav__btn_open")})),f.addEventListener("click",(function(){d.classList.toggle("sublist_show"),f.querySelector(".nav__btn").classList.toggle("nav__btn_open")})),v=document.querySelector(".menu"),console.log(v),v.addEventListener("click",(function(){console.log(v),document.querySelector(".header-nav").classList.toggle("header-nav_active")}))}();