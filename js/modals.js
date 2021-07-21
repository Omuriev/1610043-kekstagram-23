const ALERT_SHOW_TIME = 5000;

const alertTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

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

const onCloseSuccessModal = () => {
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
    onCloseSuccessModal();
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
  closeButton.addEventListener('click', onCloseSuccessModal);
  document.addEventListener('keydown', onEscButtonForSuccessModal);
};

export { showAlert, showSuccess, showErrorModal };
