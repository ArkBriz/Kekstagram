import { isEscKey } from "./util.js";

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentItemTemplate = commentsList.querySelector('.social__comment').cloneNode(true);
const commentItems = commentsList.children;
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const closeButton = bigPicture.querySelector('.cancel');
const COMMENTS_STEP = 5;

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();
  commentsList.innerHTML = '';

  comments.forEach(({ avatar, name, message }) => {
    const commentItem = commentItemTemplate.cloneNode(true);
    commentItem.querySelector('.social__picture').src = avatar;
    commentItem.querySelector('.social__picture').alt = name;
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

const hideComments = () => {
  if (commentItems.length > COMMENTS_STEP) {
    for (let i = 5; i < commentItems.length; i++) {
      commentItems[i].classList.add('hidden');
    }
  } else {
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoaderClick = (evt) => {
  const unloadedComments = Array.from(commentItems).filter((comment) => {
    return comment.classList.contains('hidden');
  });

  const startIndex = Array.from(commentItems).indexOf(
    commentsList.querySelector('.social__comment.hidden')
  );

  if (unloadedComments.length > COMMENTS_STEP) {
    for (let i = startIndex; i < startIndex + COMMENTS_STEP; i++) {
      commentItems[i].classList.remove('hidden');
    }
  } else {
    for (let i = startIndex; i < commentItems.length; i++) {
      commentItems[i].classList.remove('hidden');
    }
  };

  const leftUnloadedComments = Array.from(commentItems).filter((comment) => {
    return comment.classList.contains('hidden');
  });

  commentsCount.querySelector('.loaded-comments-count').textContent = commentItems.length - leftUnloadedComments.length;

  if (leftUnloadedComments.length === 0) {
    evt.target.classList.add('hidden');
  }
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
  commentsCount.querySelector('.loaded-comments-count').textContent = COMMENTS_STEP;

  removeEventListener('keydown', onBigPictureEscKeydown);
};

const openBigPicture = (data) => {
    renderBigPictureDetails(data);
    commentsCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    hideComments();

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    commentsLoader.addEventListener('click', onCommentsLoaderClick);
    closeButton.addEventListener('click', closePicture);
    document.addEventListener('keydown', onBigPictureEscKeydown);
};

export { openBigPicture };
