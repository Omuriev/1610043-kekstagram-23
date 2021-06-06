const DESCRIOPTIONS_OF_PHOTOS = [
  'На море',
  'В семейном кругу',
  'Едем в метро',
  'Просто фото',
  'Сфоткал еду, пусть будет',
  'Ни о чем',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.',
];

const NAMES = [
  'Артем',
  'Сергей',
  'Анастасия',
  'Иван',
  'Эдуард',
];

const posts = [];


function getRandomNumber(from, to) {
  if (from >= 0 && to > from) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
  return -1;
}

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('test', 2);

function getRandomArrayElement(element) {
  return element[getRandomNumber(0, element.length - 1)];
}

function createMessage() {
  const numberOfSentences = getRandomNumber(1,2);
  let message = '';

  for(let item = numberOfSentences; item > 0; item--) {
    message += getRandomArrayElement(COMMENTS);
  }

  return message;

}

function createCommentItem(item, index) {
  item = {
    id: index,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };
  return item;
}

function createItemDescription(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIOPTIONS_OF_PHOTOS),
    likes: getRandomNumber(15, 200),
    comments: new Array(getRandomNumber(0, 10)).fill(null).map((item, index) => createCommentItem(item, index)),
  };
}

for (let item = 1; item <= 25; item++) {
  posts.push(createItemDescription(item));
}

