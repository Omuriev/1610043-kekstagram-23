const getRandomNumber = (from, to) => {
  if (from >= 0 && to > from) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
  return -1;
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const onEscButton = (evt) => evt.keyCode === 27;

export {getRandomNumber, checkStringLength, onEscButton};

