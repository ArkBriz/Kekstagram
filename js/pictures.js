import { openBigPicture } from "./big-picture.js";

const picturesList = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content;
const pictureTemplate = templatePicture.querySelector('.picture');

// Создание мини-картинки
const createPicture = (data) => {
  const { url, likes, comments } = data;
  const smallPicture = pictureTemplate.cloneNode(true);

  smallPicture.querySelector('.picture__img').src = url;
  smallPicture.querySelector('.picture__likes').textContent = likes;
  smallPicture.querySelector('.picture__comments').textContent = comments.length;

  smallPicture.addEventListener('click', () => openBigPicture(data));

  return smallPicture;
};

// Функция отрисовки картинок на странице
const renderPictures = (pictures) => {
  picturesList.querySelectorAll('.picture').forEach((elem) => elem.remove());

  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    fragment.append(pictureElement);
  });

  picturesList.append(fragment);
};

export { renderPictures };
