import { showAlert } from './util.js';

const GET_DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        return showAlert('Не удалось загрузить данные с сервера.');
      }
    })
    .then(onSuccess)
    .catch(() => showAlert('Не удалось загрузить данные с сервера.'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok) {
        return onSuccess();
      } else {
        return onFail();
      }
    })
    .catch(() => onFail());
};

export { getData, sendData };
