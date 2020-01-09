    import {loadBigPicData, createMessage} from "./api.js";

    /** блок для вставки списка комментариев */
    const containerComments = document.querySelector('.modal__comments');
    /** шаблон комментария под фото */
    const commentTemplate = document.querySelector('#comment')
        .content
        .querySelector('.comment');

        const bigImage = document.querySelector('.modal__photo');

    /** объект для копирования данных с сервера */
    let galleryBigItem = {};

    const SERVER__PATH = 'https://boiling-refuge-66454.herokuapp.com/images/';
    let url = SERVER__PATH;


    /** функция генерирует новый url для запроса данных конкретного айтема */
    const generateRequestLink = (e) => url += e.target.dataset.index;

    // блок отображения большого изображения в модальном окне

    /**
     * функция рендерит большую картинку во всплывающем окне
     * @param {Object} item объект с данными о фото из галереи
     */
    const renderPicture = (item) => {
        bigImage.querySelector('img').src = item.url;
        bigImage.querySelector('img').dataset.index = item.id;
    };


    // блок отображения комментариев

    /** создает комментарий по шаблону
    * @param {String} commentContent
    * @return {DOMElement}
    */
    const createComment = (commentContent) => {
        const newComment = commentTemplate.cloneNode(true);
        newComment.querySelector('.comment__message').textContent = commentContent;
        return newComment;
    };

    /** отображает комментарии в DOM
    * @param {Array} comments массив объектов комментариев из объекта данных по фото
    */
    const renderComments = function (comments) {
        const fragment = document.createDocumentFragment();
        for (let comment of comments) {
            fragment.appendChild(createComment(comment.text));
        }
        containerComments.appendChild(fragment);
    };


    const successHandler = (data) => {
        galleryBigItem = data;
        renderPicture(galleryBigItem);
        renderComments(galleryBigItem.comments);
    };

    /** функция выполняется при неполадке во взаимодействии с сервером
     * @param {errorMessage} errorMessage
     */
    const errorHandler = (errorMessage) => {
       createMessage(errorMessage, 'red');
    };


    /** функция сбрасывает путь до дефолтного значения */
    const clearRequestLink = () => url = SERVER__PATH;

    /** функция сбрасывает путь к большомцу изображению */
    const clearBigPicSrc = () => bigImage.querySelector('img').src = '';

    /** обнуляет список комментариев к фотографиям */
    const clearCommentList = () => {
        containerComments.innerHTML = '';
    };


    /** обобщающая функция отображения контента в попапе */
    const showModalWindowContent = (e) => {
        const link = generateRequestLink(e);
        loadBigPicData(successHandler, errorHandler, link);
    };

    /** обобщающая функция сбрасывания контента к дефолтным значеням при закрытии попапа */
    const clearModalWindowContent = () => {
        clearRequestLink();
        clearBigPicSrc();
        clearCommentList();
    };

    export {showModalWindowContent, clearModalWindowContent};
