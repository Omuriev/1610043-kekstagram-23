const slider = document.querySelector('.effect-level__slider');
const effectValueInput = document.querySelector('.effect-level__value');
const picturePreview = document.querySelector('.img-upload__preview img');

const SLIDER_OPTIONS = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  'heat': {
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

const removeEffectOfPicture = () => {
  picturePreview.removeAttribute('class');
  picturePreview.style.removeProperty('filter');
  effectValueInput.value = '';
  slider.classList.add('hidden');
};

const addPictureFilterStyle = (effect, value) => {
  switch (effect) {
    case 'chrome':
      picturePreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      picturePreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      picturePreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      picturePreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      picturePreview.style.filter = `brightness(${value})`;
      break;
  }
};

const addEffect = (effectName) => {
  if (effectName in SLIDER_OPTIONS) {
    slider.classList.remove('hidden');
    slider.noUiSlider.off('update');
    slider.noUiSlider.updateOptions(SLIDER_OPTIONS[effectName]);
    slider.noUiSlider.on('update', (values, handle) => {
      effectValueInput.value = `${values[handle]}`;
      addPictureFilterStyle(effectName, values[handle]);
    });
  } else {
    removeEffectOfPicture();
  }
};

const onEffectClick = ({ target: { value, type } }) => {
  if (type === 'radio') {
    picturePreview.className = `effects__preview--${value}`;
    addEffect(value);
  }
};

export { createSlider, onEffectClick, removeEffectOfPicture, slider };
