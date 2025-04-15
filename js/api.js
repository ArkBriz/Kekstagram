const getData = (onSuccess) => {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    });
};

export { getData };
