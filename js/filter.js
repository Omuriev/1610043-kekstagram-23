import { renderPostsList, similarPosts } from './render-pictures.js';
import { getRandomNumber } from './util.js';
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

const setDebounce = (debounce((posts) => {
  clearPicturesCointainer();
  renderPostsList(posts);
}, DELAY));

const showFilter = () => {
  filterForm.classList.remove('img-filters--inactive');

  filterDefaultButton.addEventListener('click', () => {
    setActive(filterDefaultButton);
    setDebounce(similarPosts);
  });
  filterRandomButton.addEventListener('click', () => {
    const renderedPictures = [];
    while (renderedPictures.length < 10) {
      const getPost = similarPosts[getRandomNumber(0, similarPosts.length - 1)];
      if(!renderedPictures.includes(getPost)) {
        renderedPictures.push(getPost);
      }
    }
    setActive(filterRandomButton);
    setDebounce(renderedPictures);
  });
  filterDiscussedButton.addEventListener('click', () => {
    const discussedPictures = similarPosts.slice().sort((first, second) => first.comments.length > second.comments.length ? 1 : -1);
    discussedPictures.reverse();
    setActive(filterDiscussedButton);
    setDebounce(discussedPictures);
  });
};

export { showFilter };
