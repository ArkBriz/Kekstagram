import { isEscKey } from "./util.js";

const successMessage = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorMessage = document
  .querySelector('#error')
  .content.querySelector('.error');
const body = document.querySelector('body');

const showSuccessMessage = () => {
  body.append(successMessage);
  body.addEventListener('keydown', onEscKeydown);
  body.addEventListener('click', onBodyClick);
  successMessage
    .querySelector('.success__button')
    .addEventListener('click', closeMessage);
};

const showErrorMessage = () => {
  body.append(errorMessage);
  body.addEventListener('keydown', onEscKeydown);
  body.addEventListener('click', onBodyClick);
  errorMessage
    .querySelector('.error__button')
    .addEventListener('click', closeMessage);
};

function closeMessage () {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  body.removeEventListener('keydown', onEscKeydown);
  body.removeEventListener('click', onBodyClick);
};

function onBodyClick (evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  closeMessage();
};

function onEscKeydown (evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    closeMessage();
  }
};

export { showSuccessMessage, showErrorMessage }
