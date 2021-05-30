function getRandomNumber(from, to) {
  if (from >= 0 && to > from) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
  return -1;
}

getRandomNumber(2, 5);

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('test', 2);
