import { getZero } from "./timer";

export default function slider({container,slide ,nextArrow,prevArrow,totalCounter,currentCounter,wrapper,field}) {
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
    total.innerHTML = getZero(slideCounter);
    current.innerHTML = getZero(counter);
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
        current.innerHTML = getZero(counter);
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
        current.innerHTML = getZero(counter);
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
            current.innerHTML = getZero(counter);
            dots.forEach(dot=> {
                dot.style.opacity = '0.5';
            });
            dots[counter-1].style.opacity = 1;
        });
    });
}