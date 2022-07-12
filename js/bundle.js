/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calc)
/* harmony export */ });
function calc() {
    

    const result = document.querySelector('.calculating__result span');



    let sex , height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.addEventListener('click', (e)=>{
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformaion(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input',() => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }


            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDynamicInformaion('#weight');
    getDynamicInformaion('#height');
    getDynamicInformaion('#age');
}

/***/ }),

/***/ "./js/modules/classes.js":
/*!*******************************!*\
  !*** ./js/modules/classes.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ classes)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function classes() {
    
    class MenuItem {
        constructor (menuImgSrc,menuImgAlt,menuTitle,menuDescr,menuPrice,parent) {
            this.menuImgSrc = menuImgSrc;
            this.menuImgAlt = menuImgAlt; 
            this.menuTitle = menuTitle;
            this.menuDescr = menuDescr;
            this.menuPrice = menuPrice;
            this.parent = document.querySelector(parent);
        }

        structure() {
            const a = document.createElement('div');
            a.innerHTML = `
            <div class="menu__item">
            <img src=${this.menuImgSrc} alt=${this.menuImgAlt}>
            <h3 class="menu__item-subtitle">${this.menuTitle}</h3>
            <div class="menu__item-descr">${this.menuDescr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total">
            <span>${this.menuPrice}</span> грн/день</div>
            </div>
            </div>`;
            this.parent.append(a);
        }
    }

    
    
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data =>{
        data.forEach(({img,price,title,descr,altimg}) => {
            new MenuItem(img,altimg,title,descr,price, ".menu .container").structure();
        });
    });

}

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector,modalTimerID) {
    const forms = document.querySelectorAll(formSelector);


    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо за запрос',
        fail: 'Ошибка'
    };

    forms.forEach(item =>{
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);


            const json = JSON.stringify(Object.fromEntries(formData.entries())); // из формы в массив массивов ,затем объект,затем json и в функцию

            
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data =>{
                console.log(data);
                showThanksModal(message.success);
                
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.fail);
            }).finally(() => {
                form.reset();
            });

        });
    }

    
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showHelp)('.modal', modalTimerID);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeHelp)('.modal');
        }, 4000);
    }
}

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeHelp": () => (/* binding */ closeHelp),
/* harmony export */   "default": () => (/* binding */ modal),
/* harmony export */   "showHelp": () => (/* binding */ showHelp)
/* harmony export */ });
function showHelp(modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');  
    document.body.style.overflow = 'hidden';
    if (modalTimerID) {} 
    clearInterval(modalTimerID);
}
function closeHelp(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show', 'fade'); 
    document.body.style.overflow = ''; 
}

function modal(triggerSelector,modalSelector,modalTimerID) {
    const modalBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    function showModal(open) {
        open.forEach(element => {
            element.addEventListener('click', () => {
                showHelp(modalSelector,modalTimerID);
            });
        });
    }
    function closeModal(main) {
        main.addEventListener('click', (e)=>{
            if (e.target === modal || e.target.getAttribute('data-close') == "") {
                closeHelp(modalSelector); 
            }
        });
        document.addEventListener('keydown', (e)=>{
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeHelp(modalSelector);
            }
        });
    }

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showHelp(modalSelector,modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    showModal(modalBtn);
    closeModal(modal);
}


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({container,slide ,nextArrow,prevArrow,totalCounter,currentCounter,wrapper,field}) {
    const slideCounter = document.querySelectorAll(container).length,
        slides = document.querySelectorAll(container),
        slider = document.querySelector(slide),
        slideRight = document.querySelector(nextArrow),
        slideLeft = document.querySelector(prevArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
    let counter = 1;
    let offset = 0;
    total.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideCounter);
    current.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(counter);
    slidesField.style.width = 100 * slideCounter + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '1s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide =>{
        slide.style.width = width;
    });


    slider.style.position = 'relative';


    const indicators = document.createElement('ol'),
        dots =[];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i = 0; i < slideCounter; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if (i==0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    slideRight.addEventListener('click',() => {
        if (offset == +width.replace(/\D/g, '') * (slideCounter - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        counter++;
        if (counter > slideCounter) {
            counter = 1;
        }
        current.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(counter);
        dots.forEach(dot=> {
            dot.style.opacity = '0.5';
        });
        dots[counter-1].style.opacity = 1;
    });

    slideLeft.addEventListener('click',() => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slideCounter - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        counter--;
        if (counter == 0) {
            counter = 4;
        }
        current.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(counter);
        dots.forEach(dot=> {
            dot.style.opacity = '0.5';
        });
        dots[counter-1].style.opacity = 1;


    });
    dots.forEach(dot =>{
        dot.addEventListener('click', (e)=>{
            const slideTo = e.target.getAttribute('data-slide-to');

            counter = slideTo;
            offset = (+width.replace(/\D/g, '') * (slideTo - 1));
            slidesField.style.transform = `translateX(-${offset}px)`;
            current.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(counter);
            dots.forEach(dot=> {
                dot.style.opacity = '0.5';
            });
            dots[counter-1].style.opacity = 1;
        });
    });
}

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabs)
/* harmony export */ });
function tabs(tabsSelector,tabsContentSelector,tabsParentSelector,activeClass){
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) =>{
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timer),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) {
    if (num >= 0 && num < 10) {
        return  `0${num}`;
    } else {
        return num;
    }
}
function timer(id,deadline) {
    

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t  / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000*60)%60)),
            seconds = Math.floor((t / (1000)%60));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds':seconds
        };    
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);


        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);


            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: data
    });
    return await res.json();
};

const getResource = async (url) => {
    let res = await fetch(url);

    if(!res.ok) {
        throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
};




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
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_classes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/classes */ "./js/modules/classes.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");








document.addEventListener('DOMContentLoaded', () => {
    const modalTimerID = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showHelp)('.modal',modalTimerID), 300000);
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal',modalTimerID);
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__["default"])('.timer','2022-07-15');
   (0,_modules_classes__WEBPACK_IMPORTED_MODULE_2__["default"])();
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', modalTimerID);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    container: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    field: '.offer__slider-inner',
    wrapper: '.offer__slider-wrapper',
    slide: '.offer__slider'
   });
   (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map