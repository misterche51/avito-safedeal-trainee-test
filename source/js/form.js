    import {upload , createMessage} from "./api.js";

    /** форма добавления комментария */
    const form = document.querySelector('.form');
    /** поле ввода имени пользователя */
    const inputName = form.querySelector('.form__field--name');
    /** поле ввода комментария */
    const inputMessage = form.querySelector('.form__field--message');
    /** модальное окно в DOM*/
    const modal = document.querySelector('.modal');
    /** фото в мадальном окне */
    const image = modal.querySelector('.photo__img');


    /** функция автоматически увеличивает высоту textarea при вводе текста */
    const autosize = ()  => {
        const el = this;
        setTimeout(function () {
            el.style.cssText = 'height:auto;';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 0);
    };

    /** обнуляет значение поля, для которого вызывается */
    const clearFieldValue = (input) => {
        input.value = '';
    };


    /** функция срабатывает, когда комметарий добавлен, всплывает окно с уведомлением, поля очищаются */
    const successPostHandler = () => {
        createMessage('Ваше сообщение успешно отправлено', `green`);
        clearFieldValue(inputName);
        clearFieldValue(inputMessage);
        inputMessage.style.height = '32px';
    };

     /** функция срабатывает, когда комметарий не смог отправиться на сервер, всплывает окно с уведомлением, значения полей остаются */
    const errorPostHandler = () => {
        createMessage('Что-то пошло не так', `red`);
    };

    inputMessage.addEventListener('keydown', autosize);

    form.addEventListener('submit', function (e) {
        const index = image.dataset.index;
        const nameValue = document.forms.new_comment.name.value;
        const commentValue = document.forms.new_comment.text.value;
        const link = `https://boiling-refuge-66454.herokuapp.com/images/${index}/comments`;
        e.preventDefault();
        const data = JSON.stringify({
            'name': nameValue,
            'comment': commentValue,
        });
        upload(data, link, successPostHandler, errorPostHandler);
    });
