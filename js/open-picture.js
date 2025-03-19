import { pictures } from "./pictures.js";
import { createFullPictureSection } from "./full-picture.js";

const page = document.querySelector('body');
const thumbnails = document.querySelector('.pictures').querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.cancel');

const openPicture = (thumbnail, fullPicture) => {
  thumbnail.addEventListener('click', function (evt) {
    evt.preventDefault();

    createFullPictureSection(fullPicture);
    bigPicture.classList.remove('hidden');
    page.classList.add('modal-open');

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

    closePicture();
  });
};

for (let i = 0; i < thumbnails.length; i++) {
  openPicture(thumbnails[i], pictures[i]);
};

const closePicture = () => {
  closeButton.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    page.classList.remove('modal-open');
  });

  page.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      page.classList.remove('modal-open');
    };
  });
};
