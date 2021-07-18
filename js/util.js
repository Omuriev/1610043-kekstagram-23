const ALERT_SHOW_TIME = 5000;

const alertTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const getRandomNumber = (from, to) => {
  if (from >= 0 && to > from) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
  return -1;
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const showAlert = (message) => {
  const alertElement = alertTemplate.cloneNode(true);
  const title = alertElement.querySelector('.error__title');
  title.style.lineHeight = '1em';
  title.textContent = message;
  alertElement.querySelector('.error__button').remove();
  document.body.appendChild(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const closeSuccessModal = () => {
  const successModal = document.querySelector('.success');
  successModal.remove();
};

const closeErrorModal = () => {
  const errorModal = document.querySelector('.error');
  errorModal.remove();
};

const onEscButtonForErrorModal = ({keyCode}) => {
  if (keyCode === 27) {
    document.removeEventListener('keydown', onEscButtonForErrorModal);
    closeErrorModal();
  }
};

const onEscButtonForSuccessModal = ({keyCode}) => {
  if (keyCode === 27) {
    document.removeEventListener('keydown', onEscButtonForSuccessModal);
    closeSuccessModal();
  }
};

const showErrorModal = () => {
  const errorModalElement = alertTemplate.cloneNode(true);
  const closeButton = errorModalElement.querySelector('.error__button');
  document.body.appendChild(errorModalElement);
  closeButton.addEventListener('click', closeErrorModal);
  document.addEventListener('keydown', onEscButtonForErrorModal);
};

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  const closeButton = successElement.querySelector('.success__button');
  document.body.appendChild(successElement);
  closeButton.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', onEscButtonForSuccessModal);
};

export { getRandomNumber, checkStringLength, showAlert, showSuccess, showErrorModal };

