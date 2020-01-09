  /** модуль работы с галереей на главной */

  /** время ожидания ответа сервера в мс */
  const TIMEOUT = 12000;
  /** успешный код при get */
  const SUCCESS_CODE = 200;
  /** успешный код при post */
  const SUCCESS_UPLOAD_CODE = 204;
  /** ссылка на сервер с данными */
  const URL = 'https://boiling-refuge-66454.herokuapp.com/images';
   /** всплывающий блок с информацией для пользователя о вазимодействии с сервером */
   const infoBox = document.querySelector('.info');
   /** пограграв с сообщением для пользователя */
   const infoMessage  = infoBox.querySelector('.info__content')

  /** функция создает XMLHttpRequest к серверу */
  const createRequest = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === SUCCESS_CODE||SUCCESS_UPLOAD_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', () => {
      onError("Произошла ошибка соединения, пожалуйста, перезагрузите страницу");
    });
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('timeout', () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout/1000} с`);
    });
    return xhr;
  };

     /** универсальная фукнция, создает узел с сообщением  */
     const createMessage = (string, borderColor) => {
      infoBox.classList.add('info--active');
      infoMessage.innerHTML = string;
      infoBox.style.borderColor = borderColor;
      setTimeout(() => {
          infoBox.classList.remove('info--active');
          infoBox.style.borderColor = null;
      },1500);
  };

  /** функция запрашиват данные */
  const load = (onSuccess, onError) => {
    const xhr = createRequest(onSuccess, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

  /** функция отправляет данные на сервер */
  const upload = (data, link, onSuccess, onError) => {
    const xhr = createRequest(onSuccess, onError);
    xhr.open('POST', link);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
  };

  const loadBigPicData = (onSuccess, onError, requestLink) => {
    const xhr = createRequest(onSuccess, onError);
    xhr.open('GET', requestLink);
    xhr.send();
  };

  export {load, upload, loadBigPicData, createMessage};
