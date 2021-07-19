import { renderPostsList, similarPosts } from './render-pictures.js';
import { debounce } from './utils/debounce.js';

const DELAY = 500;

const filterForm = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');

const clearPicturesCointainer = () => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const setActive = (activeButton) => {
  filterButtons.forEach((filterButton) => {
    filterButton.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const shufflePosts = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const randomNum = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomNum]] = [array[randomNum], array[index]];
  }
};

const setDebounce = (debounce((posts) => {
  clearPicturesCointainer();
  renderPostsList(posts);
}, DELAY));

const showFilter = () => {
  filterForm.classList.remove('img-filters--inactive');

  filterDefaultButton.addEventListener('click', () => {
    setActive(filterDefaultButton);
    const defaultPictures = similarPosts.sort((first, second) => first.id > second.id ? 1 : -1);
    setDebounce(defaultPictures);
  });


  filterRandomButton.addEventListener('click', () => {
    shufflePosts(similarPosts);
    setActive(filterRandomButton);
    setDebounce(similarPosts.slice(0, 10));
  });
  filterDiscussedButton.addEventListener('click', () => {
    const discussedPictures = [...similarPosts];
    discussedPictures.sort((first, second) => first.comments.length > second.comments.length ? -1 : 1);
    setActive(filterDiscussedButton);
    setDebounce(discussedPictures);
  });
};

export { showFilter };
