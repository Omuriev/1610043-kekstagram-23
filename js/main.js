import { renderPostsList } from './render-pictures.js';
import { getData } from './api.js';
import './render-big-picture.js';
import './edit-picture-form.js';
import './noUISlider.js';

getData((posts) => {
  renderPostsList(posts);
});
