import { isEscKey } from "./util.js";

const body = document.querySelector('body');
const uploadImgModal = document.querySelector('.img-upload');
const imgUploadForm = uploadImgModal.querySelector('.img-upload__form');
const uploadImgField = uploadImgModal.querySelector('#upload-file');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const closeButton = uploadImgModal.querySelector('#upload-cancel');
const commentField = document.querySelector('.text__description');

const MAX_HASHTAGS_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const VALID_SYMBOLS = /^#[a-zA-Z0-9а-яА-ЯёЁ]{1,19}$/;

function openUploadModal () {
  imgUploadForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadModalEscKeydown);
};

function closeUploadModal () {
  imgUploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
  body.classList.remove('modal-open');

  imgUploadForm.reset();
  pristine.reset();
  // или
  // uploadImgField.value = '';
  // hashtagsField.value = '';
  // commentField.value = '';

  document.removeEventListener('keydown', onUploadModalEscKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagsField ||
  document.activeElement === commentField;

function onUploadModalEscKeydown (evt) {
  if (isEscKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const onUploadInputChange = () => {
  openUploadModal();
};

const onCancelButtonClick = () => {
  closeUploadModal();
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'text',
  errorTextParent: 'text',
  errorTextClass: 'text__error'
});

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => VALID_SYMBOLS.test(string);

const isValidTag = (tag) =>
  hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAGS_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function validateTags (value) {
  const tags = value.trim().split(' ');
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagsField,
  validateTags,
  'Поле хэштегов заполнено неверно'
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
}

uploadImgField.addEventListener('change', onUploadInputChange);
closeButton.addEventListener('click', onCancelButtonClick);
imgUploadForm.addEventListener('submit', onFormSubmit);
