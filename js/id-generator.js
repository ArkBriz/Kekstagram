import { getRandomPositiveInteger } from "./util.js";

// Генератор идентификаторов по порядку

function createIdGenerator () {
  let createdId = 0;

  return function () {
    return createdId += 1;
  };
}

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

const commentId = createRandomIdGenerator(1, 999);
const photoId = createIdGenerator();
const photoUrlId = createIdGenerator();

export { commentId, photoId, photoUrlId };
