import { getRandomPositiveInteger, getRandomArrayElement } from "./util";

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


// Функция для создания объекта комментария
const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

// Функция для создания объекта описания фото
const createPhotoDescription = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from(
    {length: getRandomPositiveInteger(1, 2)},
    (_, commentIndex) => createComment(commentIndex + 1)
  ),
});

// Функция для создания массива объектов описаний фото
const getPhotos = () =>
  Array.from(
    {length: 25},
    (_, photoIndex) => createPhotoDescription(photoIndex + 1)
  );

export {getPhotos};
