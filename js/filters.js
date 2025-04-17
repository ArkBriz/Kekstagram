import { renderPictures } from './pictures.js';

const PICTURES_COUNT = 12;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');

let pictures = [];
let currentFilter = '';

const turnFilterOn = (loadedPictures) => {
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  currentFilter = Filter.DEFAULT;
};

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
    pictureB.comments.length - pictureA.comments.length;

const sortPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    case Filter.DEFAULT:
      return [...pictures];
  }
};

filtersElement.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  };

  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  };

  filtersElement
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');

  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
  renderPictures(sortPictures());
});

export { turnFilterOn, sortPictures };
