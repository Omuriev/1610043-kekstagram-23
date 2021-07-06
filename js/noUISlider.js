const slider = document.querySelector('.effect-level__slider');
const effectValueInput = document.querySelector('.effect-level__value');
const picturePreview = document.querySelector('.img-upload__preview img');

const SLIDER_OPTIONS = {
  'effect-chrome': {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  'effect-sepia': {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  'effect-marvin': {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  'effect-phobos': {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  'effect-heat': {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
};

const createSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effectValueInput.value = 100;
  slider.classList.add('hidden');
};

const addPictureFilterStyle = (effect, value) => {
  switch (effect) {
    case 'effect-chrome':
      picturePreview.style.filter = `grayscale(${value})`;
      break;
    case 'effect-sepia':
      picturePreview.style.filter = `sepia(${value})`;
      break;
    case 'effect-marvin':
      picturePreview.style.filter = `invert(${value}%)`;
      break;
    case 'effect-phobos':
      picturePreview.style.filter = `blur(${value}px)`;
      break;
    case 'effect-heat':
      picturePreview.style.filter = `brightness(${value})`;
      break;
  }
};

const changePictureFilter = (effect) => {
  slider.noUiSlider.on('update', (values, handle) => {
    effectValueInput.value = `${values[handle]}`;
    addPictureFilterStyle(effect, values[handle]);
  });
};

const changeSliderOptions = (effectName) => {
  if (effectName in SLIDER_OPTIONS) {
    slider.classList.remove('hidden');
    slider.noUiSlider.updateOptions(SLIDER_OPTIONS[effectName]);
    changePictureFilter(effectName);
  } else {
    slider.noUiSlider.off('update');
  }
};

export { changeSliderOptions, changePictureFilter, createSlider, slider };
