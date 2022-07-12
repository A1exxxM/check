import calc from './modules/calculator';
import modal from './modules/modal';
import classes from './modules/classes';
import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import forms from './modules/forms';
import {showHelp} from './modules/modal';
document.addEventListener('DOMContentLoaded', () => {
    const modalTimerID = setTimeout(() => showHelp('.modal',modalTimerID), 300000);
   tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
   modal('[data-modal]','.modal',modalTimerID);
   timer('.timer','2022-07-15');
   classes();
   forms('form', modalTimerID);
   slider({
    container: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    field: '.offer__slider-inner',
    wrapper: '.offer__slider-wrapper',
    slide: '.offer__slider'
   });
   calc();
});