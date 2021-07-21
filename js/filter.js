import { renderPostsList, similarPosts } from './render-pictures.js';
import { debounce } from './utils/debounce.js';

const DELAY = 500;

const filterForm = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');

const clearPicturesContainer = () => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const setActive = (activeButton) => {
  const currentActiveButton = document.querySelector('.img-filters__button--active');
  currentActiveButton.classList.remove('img-filters__button--active');
  activeButton.classList.add('img-filters__button--active');
};

const shufflePosts = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const randomNum = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomNum]] = [array[randomNum], array[index]];
  }
};

const setDebounce = (debounce((posts) => {
  clearPicturesContainer();
  renderPostsList(posts);
}, DELAY));

const showFilter = () => {
  filterForm.classList.remove('img-filters--inactive');

  filterDefaultButton.addEventListener('click', () => {
    setActive(filterDefaultButton);
    setDebounce(similarPosts);
  });
  filterRandomButton.addEventListener('click', () => {
    const randomPosts = [...similarPosts];
    shufflePosts(randomPosts);
    setActive(filterRandomButton);
    setDebounce(randomPosts.slice(0, 10));
  });
  filterDiscussedButton.addEventListener('click', () => {
    const discussedPictures = [...similarPosts];
    discussedPictures.sort((first, second) => first.comments.length > second.comments.length ? -1 : 1);
    setActive(filterDiscussedButton);
    setDebounce(discussedPictures);
  });
};

export { showFilter };
