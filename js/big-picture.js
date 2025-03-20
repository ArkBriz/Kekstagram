import { isEscKey } from "./util.js";

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentItemTemplate = commentsList.querySelector('.social__comment').cloneNode(true);
const closeButton = bigPicture.querySelector('.cancel');

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();
  commentsList.innerHTML = '';

  comments.forEach(({ avatar, name, message }) => {
    const commentItem = commentItemTemplate.cloneNode(true);
    commentItem.querySelector('img').src = avatar;
    commentItem.querySelector('img').alt = name;
    commentItem.querySelector('.social__text').textContent = message;
    fragment.append(commentItem);
  });

  commentsList.append(fragment);
};

const renderBigPictureDetails = ({ url, likes, comments, description  }) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  createComments(comments);
};

const openBigPicture = (data) => {
    renderBigPictureDetails(data);
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    closeButton.addEventListener('click', closePicture);
    document.addEventListener('keydown', onBigPictureEscKeydown);

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

function onBigPictureEscKeydown (evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

function closePicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  removeEventListener('keydown', onBigPictureEscKeydown);
};

export { openBigPicture };
