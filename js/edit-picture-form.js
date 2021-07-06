import { checkStringLength } from './util.js';
import { changeSliderOptions, createSlider, slider } from './noUISlider.js';

const MAX_COMMENT_LENGTH = 140;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_CHANGE_VALUE = 25;

const uploadPictureInput = document.querySelector('#upload-file');
const editPictureForm = document.querySelector('.img-upload__overlay');
const editPictureCancelButton = editPictureForm.querySelector('#upload-cancel');
const hashtagsInput = editPictureForm.querySelector('.text__hashtags');
const commentInput = editPictureForm.querySelector('.text__description');
const smallScaleControl = editPictureForm.querySelector('.scale__control--smaller');
const bigScaleControl = editPictureForm.querySelector('.scale__control--bigger');
const scaleControlValue = editPictureForm.querySelector('.scale__control--value');
const picturePreview = editPictureForm.querySelector('.img-upload__preview img');
const effectPictureControl = document.querySelector('.effects__list');

const ErrorMessages = {
  HASHTAG_SUM: 'Нельзя указать больше 5 хэш-тегов',
  HASHTAG_REPEAT: 'Хэштеги не должны повторяться',
  HASHTAG_TEMPLATE: 'Хэштеги не соответствуют требованиям. Хэштег должен начинаться с знака #, не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи',
  COMMENT_LENGTH: 'Длинна комментария не должна быть больше 140 символов',
};
Object.freeze(ErrorMessages);

const removeEffectOfPicture = () => {
  picturePreview.removeAttribute('class');
  picturePreview.style.removeProperty('filter');
  slider.classList.add('hidden');
};

const addEffectOfPicture = ({ target: { value, id } }) => {

  if(value !== 'none' && id) {
    picturePreview.className = '';
    picturePreview.classList.add(`effects__preview--${value}`);
    changeSliderOptions(id);
    // changePictureFilter(`effect-phobos`);
  } else {
    removeEffectOfPicture();
  }

};

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
  const {value} = evt.target;
  if(!checkStringLength(value, MAX_COMMENT_LENGTH)) {
    commentInput.setCustomValidity(ErrorMessages.COMMENT_LENGTH);
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
};

const closeEditPictureForm = () => {
  uploadPictureInput.value = '';
  editPictureForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  editPictureCancelButton.removeEventListener('click', closeEditPictureForm);
  hashtagsInput.removeEventListener('input', getHashtags);
  hashtagsInput.removeEventListener('keydown', onInputFocused);
  commentInput.removeEventListener('input',checkComment);
  commentInput.removeEventListener('keydown', onInputFocused);
  smallScaleControl.removeEventListener('click', changePictureScale);
  bigScaleControl.removeEventListener('click', changePictureScale);
  effectPictureControl.removeEventListener('click', addEffectOfPicture);
  slider.noUiSlider.destroy();
};

const onEscButton = (evt) => {
  if (evt.keyCode === 27) {
    closeEditPictureForm();
    document.removeEventListener('keydown', onEscButton);
  }
};

const showEditPictureForm = () => {
  editPictureForm.classList.remove('hidden');
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
  effectPictureControl.addEventListener('click', addEffectOfPicture);
  createSlider();
};

uploadPictureInput.addEventListener('change', () => {
  if (uploadPictureInput.value) {
    showEditPictureForm(uploadPictureInput.value);
  }
});
