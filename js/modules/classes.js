import { getResource } from "../services/services";

export default function classes() {
    
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

    
    
    getResource('http://localhost:3000/menu')
    .then(data =>{
        data.forEach(({img,price,title,descr,altimg}) => {
            new MenuItem(img,altimg,title,descr,price, ".menu .container").structure();
        });
    });

}