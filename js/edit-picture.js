const scale = document.querySelector('.scale');
const smallerScale = scale.querySelector('.scale__control--smaller');
const biggerScale = scale.querySelector('.scale__control--bigger');
const scaleControl = scale.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects__list');
const effectButtons = effectsContainer.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
});

let scaleValue = 100;
let transformScaleValue = 1;

const EFFECTS = [
  'none',
  'chrome',
  'sepia',
  'marvin',
  'phobos',
  'heat'
];

smallerScale.addEventListener('click', () => {
  if (scaleControl.value === '25%') {
    scaleControl.value = `${scaleValue}%`;
  } else {
    scaleValue -= 25;
    scaleControl.value = `${scaleValue}%`;
    image.style.transform = `scale(${transformScaleValue -= 0.25})`;
  }
});

biggerScale.addEventListener('click', () => {
  if (scaleControl.value === '100%') {
    scaleControl.value = `${scaleValue}%`;
  } else {
    scaleValue += 25;
    scaleControl.value = `${scaleValue}%`;
    image.style.transform = `scale(${transformScaleValue += 0.25})`;
  }
});

const onEffectButtonsClick = function (effect) {
  if (image.classList.length) {
    image.classList.remove(image.classList[0]);
  };
  image.classList.add(`effects__preview--${effect}`);
};

for (let i = 0; i < EFFECTS.length; i++) {
  effectButtons[i].addEventListener('click', () => onEffectButtonsClick(EFFECTS[i]));
};
