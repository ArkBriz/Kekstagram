// Генератор случайных чисел
function getRandomPositiveInteger (a, b = 1) {
  if (a === undefined) {
    throw new Error('Первый параметр должен быть число');
  }

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для получения случайного элемента любого массива
const getRandomArrayElement = (array) =>
  array[getRandomPositiveInteger(0, array.length - 1)];

// Функции проверки нажатой клавиши
const isEscKey = (evt) => {
  return evt.key === 'Escape';
};

// Проверка длины строки комментария
function checkStringLength(string, length) {
  return string.length <= length;
}

export {
  getRandomPositiveInteger,
  getRandomArrayElement,
  checkStringLength,
  isEscKey
};
