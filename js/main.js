// import { getPhotos } from "./data.js"; -- mock data;
import { getData } from './api.js';
import { renderPictures } from './pictures.js';
import { setOnFormSubmit, closeUploadModal } from './upload-form.js';
import { showAlert } from "./util.js";
import { showSuccessMessage, showErrorMessage } from './success-messages.js';
import { turnFilterOn, sortPictures } from './filters.js';

const onGetDataSuccess = (data) => {
  turnFilterOn(data);
  renderPictures(sortPictures());
}

const onSendDataSuccess = () => {
  closeUploadModal();
  showSuccessMessage();
};

const onSendDataError = () => {
  closeUploadModal();
  showErrorMessage();
};

setOnFormSubmit(onSendDataSuccess, onSendDataError);

getData(onGetDataSuccess, showAlert);
