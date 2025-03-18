import { pictures } from "./pictures.js";
import { createFullPictureSection } from "./full-picture.js";

const thumbnails = document.querySelector('.pictures').querySelectorAll('.picture');

const openPicture = (thumbnail, fullPicture) => {
  thumbnail.addEventListener('click', function (evt) {
    evt.preventDefault();

    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    createFullPictureSection(fullPicture);
  });
};

for (let i = 0; i < thumbnails.length; i++) {
  openPicture(thumbnails[i], pictures[i]);
};
