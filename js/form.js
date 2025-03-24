import { isEscKey } from "./util.js";

const body = document.querySelector('body');
const uploadImgModal = document.querySelector('.img-upload');
const uploadImgField = uploadImgModal.querySelector('#upload-file');
const editImgForm = uploadImgModal.querySelector('.img-upload__overlay');
const closeButton = uploadImgModal.querySelector('#upload-cancel');


uploadImgField.addEventListener('change', openUploadModal);

function openUploadModal () {
  editImgForm.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadImgField.value = '';

  closeButton.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', onUploadModalEscKeydown);
}

function closeUploadModal () {
  editImgForm.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadModalEscKeydown);
};

function onUploadModalEscKeydown (evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};
