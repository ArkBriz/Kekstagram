const effectsContainer = document.querySelector('.effects__list');
const effectButtons = effectsContainer.querySelectorAll('.effects__radio');
const image = document.querySelector('.img-upload__preview img');
const slidersContainer = document.querySelector('.effect-level');
const sliderElementTemplate = document.querySelector('.effect-level__slider');

const EFFECTS = [
  'none',
  'chrome',
  'sepia',
  'marvin',
  'phobos',
  'heat'
];

const onEffectButtonsClick = function (effect) {
  if (image.classList.length) {
    image.classList.remove(image.classList[0]);
  };
  image.classList.add(`effects__preview--${effect}`);
};

for (let i = 0; i < EFFECTS.length; i++) {
  effectButtons[i].addEventListener('click', () => onEffectButtonsClick(EFFECTS[i]));
};
