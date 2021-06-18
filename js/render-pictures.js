import {posts} from './posts.js';
import {showBigPictureModal} from './render-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPosts = posts;

const similarListFragment = document.createDocumentFragment();

similarPosts.forEach(({url, likes, comments}) => {
  const postElement = pictureTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').setAttribute('src', url);
  postElement.querySelector('.picture__likes').textContent = likes;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  similarListFragment.appendChild(postElement);
});

picturesContainer.appendChild(similarListFragment);

picturesContainer.addEventListener('click', (evt) => {
  const element = evt.target;
  if(element.className === 'picture__img') {
    evt.preventDefault();
    const post = similarPosts.find(({url}) => url === element.getAttribute('src'));
    showBigPictureModal(post);
    // .map(showBigPictureModal);
    // similarPosts.forEach((item) => {
    //   if(item.url === evt.target.getAttribute('src')) {
    //     const {url, likes, comments} = item;
    //     showBigPictureModal(url, likes, comments);
    //   }
    // });

  }
});
