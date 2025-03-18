import { getPhotos } from "./data.js";

const picturesList = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content;
const pictureTemplate = templatePicture.querySelector('.picture');

// Создание мини-картинки
const createPicture = function ({ url, likes, comments }) {
  const picture = pictureTemplate.cloneNode(true);

  const pictureImg = picture.querySelector('.picture__img');
  const likesCount = picture.querySelector('.picture__likes');
  const commentsCount = picture.querySelector('.picture__comments');

  pictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;

  return picture;
};

// Функция отрисовки картинок на странице
const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    fragment.append(pictureElement);
  });

  picturesList.append(fragment);
};

const pictures = getPhotos();
renderPictures(pictures);

export { pictures };
