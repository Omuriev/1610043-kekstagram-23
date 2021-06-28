import { onEscButton, checkStringLength } from './util.js';

const MAX_COMMENT_LENGTH = 140;

const uploadPictureInput = document.querySelector('#upload-file');
const editPictureForm = document.querySelector('.img-upload__overlay');
const editPictureCancelButton = editPictureForm.querySelector('#upload-cancel');
const hashtagsInput = editPictureForm.querySelector('.text__hashtags');
const commentInput = editPictureForm.querySelector('.text__description');

const ErrorMessages = {
  HASHTAG_SUM: 'Нельзя указать больше 5 хэш-тегов',
  HASHTAG_REPEAT: 'Хэштеги не должны повторяться',
  HASHTAG_TEMPLATE: 'Хэштеги не соответствуют требованиям. Хэштег должен начинаться с знака #, не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи',
  COMMENT_LENGTH: 'Длинна комментария не должна быть больше 140 символов',
};
Object.freeze(ErrorMessages);

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
  document.removeEventListener('keydown', onEscButton);
};

const showEditPictureForm = () => {
  editPictureForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  editPictureCancelButton.addEventListener('click', closeEditPictureForm);
  hashtagsInput.addEventListener('input', getHashtags);
  hashtagsInput.addEventListener('keydown', onInputFocused);
  commentInput.addEventListener('input', checkComment);
  commentInput.addEventListener('keydown', onInputFocused);
  document.addEventListener('keydown', onEscButton(closeEditPictureForm));
};

uploadPictureInput.addEventListener('change', () => {
  if (uploadPictureInput.value) {
    showEditPictureForm(uploadPictureInput.value);
  }
});
