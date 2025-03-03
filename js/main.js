import { getRandomArrayElement } from "./util";

// Проверка длины строки комментария
function checkStringLength (string, length) {
  return string.length <= length;
}

// Функция для создания объекта комментария
const createComment = () => ({
  id: getRandomPositiveInteger(1, 51325),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

// Функция для создания объекта описания фото
const createPhotoDescription = () => ({
  id: getRandomPositiveInteger(1, 25),
  url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: getRandomPositiveInteger(0, 6)}, createComment),
});

// Функция для создания массива объектов описаний фото
const getPhotos = () =>
  Array.from({length: 25}, createPhotoDescription);

checkStringLength('', 140);
getPhotos();
