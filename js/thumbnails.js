const picturesList = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content;
const pictureTemplate = templatePicture.querySelector('.picture');

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
