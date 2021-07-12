import { checkStringLength, showSuccess, showErrorModal } from './util.js';
import { sendData } from './api.js';
import { createSlider, onEffectClick, removeEffectOfPicture, slider } from './noUISlider.js';

const MAX_COMMENT_LENGTH = 140;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_CHANGE_VALUE = 25;

const uploadPictureInput = document.querySelector('#upload-file');
const editPictureModal = document.querySelector('.img-upload__overlay');
const editPictureCancelButton = editPictureModal.querySelector('#upload-cancel');
const hashtagsInput = editPictureModal.querySelector('.text__hashtags');
const commentInput = editPictureModal.querySelector('.text__description');
const smallScaleControl = editPictureModal.querySelector('.scale__control--smaller');
const bigScaleControl = editPictureModal.querySelector('.scale__control--bigger');
const scaleControlValue = editPictureModal.querySelector('.scale__control--value');
const picturePreview = editPictureModal.querySelector('.img-upload__preview img');
const effectPictureControl = document.querySelector('.effects__list');
const editPictureForm = document.querySelector('.img-upload__form');

const ErrorMessages = {
  HASHTAG_SUM: 'Нельзя указать больше 5 хэш-тегов',
  HASHTAG_REPEAT: 'Хэштеги не должны повторяться',
  HASHTAG_TEMPLATE: 'Хэштеги не соответствуют требованиям. Хэштег должен начинаться с знака #, не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи',
  COMMENT_LENGTH: 'Длинна комментария не должна быть больше 140 символов',
};
Object.freeze(ErrorMessages);

const zoomIn = (value) => {
  if (value < SCALE_MAX_VALUE) {
    const scaleValue = value + SCALE_CHANGE_VALUE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
};

const zoomOut = (value) => {
  if (value > SCALE_MIN_VALUE) {
    const scaleValue = value - SCALE_CHANGE_VALUE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
};

const changePictureScale = ({ target }) => {
  const value = parseInt(scaleControlValue.value, 10);
  if (target === smallScaleControl) {
    zoomOut(value);
  } else if (target === bigScaleControl) {
    zoomIn(value);
  }
};

const checkUniqueHashtags = (hashtags) => {
  const uniqueValue = [];
  for (let index = 0; index < hashtags.length; ++index) {
    const value = hashtags[index].toLowerCase();
    if (uniqueValue.indexOf(value) !== -1) {
      return false;
    }
    uniqueValue.push(value);
  }
  return true;
};

const isFit = (hashtags, template) => hashtags.every((element) => template.test(element));

const renderValidationMessages = (hashtags) => {
  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  if (!isFit(hashtags, re)) {
    hashtagsInput.setCustomValidity(ErrorMessages.HASHTAG_TEMPLATE);
  } else if (!checkUniqueHashtags(hashtags)) {
    hashtagsInput.setCustomValidity(ErrorMessages.HASHTAG_REPEAT);
  } else if (hashtags.length > 5) {
    hashtagsInput.setCustomValidity(ErrorMessages.HASHTAG_SUM);
  } else {
    hashtagsInput.setCustomValidity('');
  }
  hashtagsInput.reportValidity();
};

const getHashtags = (evt) => {
  const hashtags = evt.target.value.split(' ');
  renderValidationMessages(hashtags);
};

const onInputFocused = (evt) => {
  evt.stopPropagation();
};

const checkComment = (evt) => {
  const { value } = evt.target;
  if(!checkStringLength(value, MAX_COMMENT_LENGTH)) {
    commentInput.setCustomValidity(ErrorMessages.COMMENT_LENGTH);
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
};

const resetFormValues = () => {
  uploadPictureInput.value = '';
  picturePreview.style.transform = 'scale(1)';
  effectPictureControl.children[0].querySelector('input[type="radio"]').checked = true;
  hashtagsInput.value = '';
  commentInput.value = '';
};

const closeEditPictureForm = () => {
  resetFormValues();
  removeEffectOfPicture();
  editPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  editPictureCancelButton.removeEventListener('click', closeEditPictureForm);
  hashtagsInput.removeEventListener('input', getHashtags);
  hashtagsInput.removeEventListener('keydown', onInputFocused);
  commentInput.removeEventListener('input',checkComment);
  commentInput.removeEventListener('keydown', onInputFocused);
  smallScaleControl.removeEventListener('click', changePictureScale);
  bigScaleControl.removeEventListener('click', changePictureScale);
  effectPictureControl.removeEventListener('click', onEffectClick);
  slider.noUiSlider.destroy();
};

const setFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(
    () => {
      closeEditPictureForm();
      showSuccess();
    },
    () => {
      closeEditPictureForm();
      showErrorModal();
    },
    new FormData(evt.target),
  );
};

const onEscButton = (evt) => {
  if (evt.keyCode === 27) {
    closeEditPictureForm();
    document.removeEventListener('keydown', onEscButton);
  }
};

const showEditPictureForm = () => {
  editPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleControlValue.value = '100%';
  editPictureCancelButton.addEventListener('click', closeEditPictureForm);
  hashtagsInput.addEventListener('input', getHashtags);
  hashtagsInput.addEventListener('keydown', onInputFocused);
  commentInput.addEventListener('input', checkComment);
  commentInput.addEventListener('keydown', onInputFocused);
  document.addEventListener('keydown', onEscButton);
  smallScaleControl.addEventListener('click', changePictureScale);
  bigScaleControl.addEventListener('click', changePictureScale);
  effectPictureControl.addEventListener('click', onEffectClick);
  createSlider();
  editPictureForm.addEventListener('submit', setFormSubmit);
};

uploadPictureInput.addEventListener('change', () => {
  if (uploadPictureInput.value) {
    showEditPictureForm(uploadPictureInput.value);
  }
});

export { setFormSubmit, closeEditPictureForm };
