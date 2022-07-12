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

export default function modal(triggerSelector,modalSelector,modalTimerID) {
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
export {closeHelp,showHelp};