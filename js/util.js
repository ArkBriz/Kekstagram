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

// Сообщение об ошибке при получении данных с сервера
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.textContent = message;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = '10px';
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px';
  alertContainer.style.zIndex = 100;
  alertContainer.style.color = 'white';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.textAlign = 'center';

  document.body.append(alertContainer);
};

export {
  getRandomPositiveInteger,
  getRandomArrayElement,
  showAlert,
  isEscKey
};
