const scale = document.querySelector('.scale');
const smallerScale = scale.querySelector('.scale__control--smaller');
const biggerScale = scale.querySelector('.scale__control--bigger');
const scaleControleValue = scale.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

let scaleValue = 100;
let scaleStyleValue = 1;

smallerScale.addEventListener('click', () => {
  if (scaleValue === 25) {
    scaleControleValue.value = `${scaleValue}%`;
  } else {
    scaleValue -= 25;
    scaleControleValue.value = `${scaleValue}%`;
    image.style.transform = `scale(${scaleStyleValue -= 0.25})`;
  }
});

biggerScale.addEventListener('click', () => {
  if (scaleValue === 100) {
    scaleControleValue.value = `${scaleValue}%`;
  } else {
    scaleValue += 25;
    scaleControleValue.value = `${scaleValue}%`;
    image.style.transform = `scale(${scaleStyleValue += 0.25})`;
  }
});




