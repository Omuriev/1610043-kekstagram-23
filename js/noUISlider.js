const slider = document.querySelector('.effect-level__slider');
const effectValueInput = document.querySelector('.effect-level__value');
const picturePreview = document.querySelector('.img-upload__preview img');

effectValueInput.value = 100;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 0.1,
});

slider.classList.add('hidden');

const changeSliderOptions = (effect) => {
  slider.classList.remove('hidden');
  switch (effect) {
    case 'effect-chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      break;
    case 'effect-sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      break;
    case 'effect-marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
      break;
    case 'effect-phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      break;
    case 'effect-heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      break;
    default:
      slider.classList.add('hidden');
      break;
  }
};

const changePictureFilter = (effect) => {
  slider.noUiSlider.on('update', (evt, handle, unencoded) => {
    effectValueInput.value = unencoded[handle];
    switch (effect) {
      case 'effect-chrome':
        picturePreview.style.filter = `grayscale(${unencoded[handle]})`;
        break;
      case 'effect-sepia':
        picturePreview.style.filter = `sepia(${unencoded[handle]})`;
        break;
      case 'effect-marvin':
        picturePreview.style.filter = `invert(${unencoded[handle]}%)`;
        break;
      case 'effect-phobos':
        picturePreview.style.filter = `blur(${unencoded[handle]}px)`;
        break;
      case 'effect-heat':
        picturePreview.style.filter = `brightness(${unencoded[handle]})`;
        break;
      default:
        break;
    }

  });
};

export { changeSliderOptions, changePictureFilter };
