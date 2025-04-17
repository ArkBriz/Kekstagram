const Filter = [
  DEFAULT = 'filter-default',
  RANDOM = 'filter-random',
  DISCUSSED = 'filter-discussed',
];

const filtersElement = document.querySelector('.img-filters');

let pictures = [];
let currentFilter = '';

const turnFilterOn = (loadedPictures) => {
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  currentFilter = Filter.DEFAULT;
};
