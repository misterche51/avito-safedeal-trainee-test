    import {clearModalWindowContent, showModalWindowContent} from "./big-picture.js";

    /** список-галерея превью*/
    const gallery = document.querySelector('.gallery__list');
    /** бэкграунд всплывающего окна */
    const overlay = document.querySelector('.overlay');
    /** окно с отдельной фотографией, комментариями к ней и формой для отправки комментария */
    const modal = document.querySelector('.modal');
    /** кнопка закрытия окна с фотографией */
    const buttonCloseModal = modal.querySelector('.modal__close-button');

    const ESC_KEYCODE = 27;
    const ENTER_KEYCODE = 13;

    /** функция возвращает буль, зависящий от нажатия enter */
    const isEnterPressed = (e) => e.keyCode === ENTER_KEYCODE;
     /** функция возвращает буль, зависящий от нажатия esc */
    const isEscPressed = (e) => e.keyCode === ESC_KEYCODE;

    /** функция показывает модальное окно и навешивает необходимые обработчики для закрытия */
    const openModalWindow = () => {
        overlay.classList.add('overlay--active');
        modal.classList.add('modal--active');
        buttonCloseModal.addEventListener('click', closeButtonClickHandler);
        document.addEventListener('keydown', escapeKeydownHandler);
        overlay.addEventListener('click', overlayClickHandler);
    };

    const closeModalWindow = () => {
        overlay.classList.remove('overlay--active');
        modal.classList.remove('modal--active');
        buttonCloseModal.removeEventListener('click', closeButtonClickHandler);
        document.removeEventListener('keydown', escapeKeydownHandler);
        overlay.removeEventListener('click', overlayClickHandler);
        clearModalWindowContent();
    };

    /** функция открытия окна с фотографией и данными о ней, срабатывает при клике на соответствующем превью */
    const galleryItemClickHandler = (e) => {
        const isPreviewPic = e.target.classList.contains('gallery__item-preview');
        if (isPreviewPic) {
            showModalWindowContent(e);
            openModalWindow();
        }
    };

    /** функция открытия окна с фотографией и данными о ней, срабатывает при нажатии ent, находясь на соответствующем превью */
    const galleryItemKeydownHandler = (e) => {
        if (isEnterPressed(e)) {
            e.preventDefault();
            showModalWindowContent(e);
            openModalWindow();
        }
    };
    /** функция закрытия окна при клике на кнопку закрыть */
    const closeButtonClickHandler = (e) => {
        e.preventDefault();
        closeModalWindow();
    };
    /** функция закрытия окна при нажатии на esc, не срабатывает, если пользователь находится в текстовом инпуте */
    const escapeKeydownHandler = (e) => {
        if (isEscPressed(e) && e.target.type !== 'text') {
            closeModalWindow();
        }
    };

    /** закрывает модальное окно при клике вне его самого */
    const overlayClickHandler = (e) => {
        if(e.currentTarget !== modal) {
            closeModalWindow();
        }
    };

    gallery.addEventListener('click', galleryItemClickHandler);
    gallery.addEventListener('keydown', galleryItemKeydownHandler);

    export {closeModalWindow};
