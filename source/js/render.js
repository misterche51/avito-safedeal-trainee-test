    /** Модуль с функциями для рендеринга превью */
    import {load} from "./api.js";

    /** копия данных с сервера */
    let galleryItems = [];
    /** блок для вставки списка отрендеренных первью */
    const container = document.querySelector('.gallery__list');
    /** шаблон миниатюры в галерее на главной */
    const pictureTemplate = document.querySelector('#preview')
        .content
        .querySelector('.gallery__item');

    /**
     * функция рендерит отдельно взятый айтем первью
     * @param {Object} item объект миниатюры
     */
    const renderItem = (item) => {
        const newPicture = pictureTemplate.cloneNode(true);
        const newPictureImg = newPicture.querySelector('.gallery__item-preview');
        newPictureImg.src = item.url;
        newPictureImg.dataset.index = item.id;
        return newPicture;
    };

    /**
     * функция рендерит список превью и вставляет их на страницу
     * @param {Array} data данные с сервера в формате массива объектов
     */
    const render = (data) => {
        const fragment = document.createDocumentFragment();
        for (let item of data) {
            fragment.appendChild(renderItem(item));
        }
        container.appendChild(fragment);
    };

    /**
     * @param {Array} data данные с сервера в формате массива объектов
     */
    const successHandler = (data) => {
        galleryItems = data;
        render(galleryItems);
    };

    /** функция выполняется при неполадке во взаимодействии с сервером
   * @param {errorMessage} errorMessage
   */
  const errorHandler = (errorMessage) => {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 100px auto; width: 300px; height: 200px; padding: 20px; text-align: center; border-radius: 4px; background: #ffffff; border: 3px solid tomato';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '15px';
    node.style.color = 'tomato';
    node.innerHTML = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

    load(successHandler, errorHandler);