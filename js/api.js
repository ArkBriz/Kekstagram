import { showAlert } from "./util.js";

const getData = (onSuccess) => {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      showAlert('Не удалось загрузить фотографии! Попробуйте перезагрузить страницу.');
    });
};

export { getData };
