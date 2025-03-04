import { getRandomPositiveInteger } from "./util.js";

// Генератор случайных неповторяющихся идентификаторов из диапазона

function createRandomIdGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа от ${min} до ${max}`);
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
}

const commentId = createRandomIdGenerator(1, 9999);
const photoId = createRandomIdGenerator(1, 25);
const photoUrlId = createRandomIdGenerator(1, 25);

export { commentId, photoId, photoUrlId };
