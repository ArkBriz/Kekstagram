import { isEscKey } from "./util.js";
import { resetScale } from "./scale.js";
import { resetEffects } from "./effects.js";
import { sendData } from "./api.js";

const body = document.querySelector('body');
const uploadImgModal = document.querySelector('.img-upload');
const imgUploadForm = uploadImgModal.querySelector('.img-upload__form');
const uploadImgField = uploadImgModal.querySelector('#upload-file');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const closeButton = uploadImgModal.querySelector('#upload-cancel');
const commentField = document.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const MAX_HASHTAGS_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const VALID_SYMBOLS = /^#[a-zA-Z0-9а-яА-ЯёЁ]{1,19}$/;
const FILE_TYPES = ['png', 'jpg', 'jpeg'];

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__input-wrapper',
  errorTextParent: 'img-upload__input-wrapper',
  errorTextClass: 'text-input__error'
});

const openUploadModal = () => {
  imgUploadForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const closeUploadModal = () => {
  imgUploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
  body.classList.remove('modal-open');

  imgUploadForm.reset();
  resetScale();
  resetEffects();

  pristine.reset();
  // или
  // uploadImgField.value = '';
  // hashtagsField.value = '';
  // commentField.value = '';

  document.removeEventListener('keydown', onEscKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagsField ||
  document.activeElement === commentField;

function onEscKeydown (evt) {
  if (isEscKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const onCancelButtonClick = () => {
  closeUploadModal();
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((item) => fileName.endsWith(item));
};

const onUploadInputChange = () => {
  const file = uploadImgField.files[0];

  if (file && isValidType(file)) {
    preview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((effect) => effect.style.backgroundImage = `url(${preview.src})`);
  }

  openUploadModal();
};

const startsWithHash = (string) => string[0] === '#';

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => VALID_SYMBOLS.test(string);

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAGS_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function validateTags (value) {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

const getErrorMessage = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

  if (lowerCaseTags.length !== new Set(lowerCaseTags).size) {
    return 'Хэштеги не должны повторяться'
  };

  if (tags.length > MAX_HASHTAGS_COUNT) {
    return `Хэштегов не должно быть больше ${MAX_HASHTAGS_COUNT}`;
  };

  for (let i = 0; i < tags.length; i++) {
    if (tags[i][0] !== '#') {
      return 'Хэштег должен начинаться со знака #';
    };

    if (tags[i].length > MAX_HASHTAG_LENGTH || tags[i].length < 2) {
      return 'Хэштег должен быть от 2 до 20 символов';
    };

    if (!VALID_SYMBOLS.test(tags[i])) {
      return 'Хэштег должен состоять только из букв и цифр';
    }
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

pristine.addValidator(
  hashtagsField,
  validateTags,
  getErrorMessage
);

const setOnFormSubmit = (onSuccess, onFail) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        new FormData(imgUploadForm)
      )
    }
  });
};

uploadImgField.addEventListener('change', onUploadInputChange);
closeButton.addEventListener('click', onCancelButtonClick);

export { setOnFormSubmit, closeUploadModal };
