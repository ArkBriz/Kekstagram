import { getRandomPositiveInteger, getRandomArrayElement } from "./util.js";
import { commentId, photoId, photoUrlId } from "./id-generator.js";

const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5',
  'Описание 6',
  'Описание 7',
  'Описание 8',
  'Описание 9',
  'Описание 10',
  'Описание 11',
  'Описание 12',
  'Описание 13',
  'Описание 14',
  'Описание 15',
];

const NAMES = ['Вася', 'Петя', 'Андрей', 'Саша', 'Вова', 'Игорь', 'Витя', 'Женя', 'Серега', 'Боря'];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const Ranges = {
  LIKES_COUNT_FROM: 15,
  LIKES_COUNT_TO: 200,
  COMMENTS_COUNT_FROM: 0,
  COMMENTS_COUNT_TO: 20,
  PHOTO_DESC_COUNT: 25,
};

const { LIKES_COUNT_FROM, LIKES_COUNT_TO, COMMENTS_COUNT_FROM, COMMENTS_COUNT_TO, PHOTO_DESC_COUNT } = Ranges;

// Сообщение комментария

const commentMessage = () =>
    Array.from(
    {length: getRandomPositiveInteger(1, 2)},
  () => getRandomArrayElement(COMMENTS)
  ).join(' ');


// Функция для создания объекта комментария
const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: commentMessage(),
  name: getRandomArrayElement(NAMES),
});

// Функция для создания объекта описания фото
const createPhotoDescription = () => ({
  id: photoId(),
  url: `photos/${photoUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(LIKES_COUNT_FROM, LIKES_COUNT_TO),
  comments: Array.from({length: getRandomPositiveInteger(COMMENTS_COUNT_FROM, COMMENTS_COUNT_TO)}, createComment),
});

// Функция для создания массива объектов описаний фото
const getPhotos = () =>
  Array.from({length: PHOTO_DESC_COUNT}, createPhotoDescription);

export { getPhotos };
