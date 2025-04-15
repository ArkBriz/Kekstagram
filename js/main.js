// import { getPhotos } from "./data.js"; -- mock data;
import { getData, sendData } from './api.js';
import { renderPictures } from './pictures.js';
import { setOnFormSubmit, closeUploadModal } from './upload-form.js';
import { showAlert } from "./util.js";
import { showSuccessMessage, showErrorMessage } from './success-messages.js';

const onSendDataSuccess = () => {
  closeUploadModal();
  showSuccessMessage();
};

const onSendDataError = () => {
  closeUploadModal();
  showErrorMessage();
};

setOnFormSubmit(onSendDataSuccess, onSendDataError);

getData(renderPictures, showAlert);
