import { onEscButton } from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const commentsCounter = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const bigPictureCancelButton = bigPictureModal.querySelector('.big-picture__cancel');

let generatedComments;
let commentsCount = 0;

const generateComments = (comments) => comments.reduce((acc, item) => {
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');
  const imageItem = document.createElement('img');
  imageItem.classList.add('social__picture');
  imageItem.setAttribute('src', item.avatar);
  imageItem.setAttribute('alt', item.name);
  imageItem.setAttribute('width', 35);
  imageItem.setAttribute('height', 35);
  const textItem = document.createElement('p');
  textItem.classList.add('social__text');
  textItem.textContent = item.message;
  listItem.appendChild(imageItem);
  listItem.appendChild(textItem);
  return [...acc, listItem];
}, []);

const showComments = () => {
  commentsContainer.append(...generatedComments.splice(0, 5));
  commentsCounter.textContent = `${commentsContainer.children.length} из ${commentsCount} комментариев`;
  if (!generatedComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancelButton.removeEventListener('click', closeBigPictureModal);
  document.removeEventListener('keydown', closeBigPictureModal);
  commentsLoader.removeEventListener('click', showComments);
};

const showBigPictureModal = ({url, likes, comments, description}) => {
  bigPictureModal.classList.remove('hidden');
  bigPictureImage.setAttribute('src', url);
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
  generatedComments = generateComments(comments);
  commentsCount = generatedComments.length;
  commentsLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsContainer.innerHTML = '';
  showComments();
  commentsLoader.addEventListener('click', showComments);
  bigPictureCancelButton.addEventListener('click', closeBigPictureModal);
  document.addEventListener('keydown', onEscButton.bind(null, closeBigPictureModal));
};

export {showBigPictureModal};
