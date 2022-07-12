import {closeHelp,showHelp} from "./modal";
import { postData } from "../services/services";

export default function forms(formSelector,modalTimerID) {
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

            
            postData('http://localhost:3000/requests', json)
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
        showHelp('.modal', modalTimerID);

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
            closeHelp('.modal');
        }, 4000);
    }
}