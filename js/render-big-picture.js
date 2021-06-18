const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureModal.querySelector('.likes-count');
const bigPictureDescription = bigPictureModal.querySelector('.social__caption');
const bigPictureComments = bigPictureModal.querySelector('.comments-count');
const commentsContainer = document.querySelector('.social__comments');
const commentsCounter = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const bigPictureCancelButton = bigPictureModal.querySelector('.big-picture__cancel');

let commentsFragment;
const generateComments = (comments) => {
  commentsFragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const listItem = document.createElement('li');
    listItem.classList.add('social__comment');
    const imageItem = document.createElement('img');
    imageItem.classList.add('social__picture');
    imageItem.setAttribute('src', avatar);
    imageItem.setAttribute('alt', name);
    imageItem.setAttribute('width', 35);
    imageItem.setAttribute('height', 35);
    const textItem = document.createElement('p');
    textItem.classList.add('social__text');
    textItem.textContent = message;
    listItem.appendChild(imageItem);
    listItem.appendChild(textItem);
    commentsFragment.appendChild(listItem);
  });

  return commentsFragment;
};

const showBigPictureModal = ({url, likes, comments, description}) => {
  bigPictureModal.classList.remove('hidden');
  bigPictureImage.setAttribute('src', url);
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
  bigPictureComments.textContent = comments.length;
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  commentsContainer.innerHTML = '';
  commentsContainer.appendChild(generateComments(comments));
};

const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

bigPictureCancelButton.addEventListener('click', () => {
  closeBigPictureModal();
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27 && !bigPictureModal.classList.contains('hidden')) {
    closeBigPictureModal();
  }
});

export {showBigPictureModal};
