import { getRandomNumber } from './util.js';

const DESCRIPTIONS_OF_PHOTOS = [
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

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createMessage = () => {
  const numberOfSentences = getRandomNumber(1,2);
  return Array(numberOfSentences)
    .fill()
    .map(() => getRandomArrayElement(COMMENTS))
    .join(' ');
};

const createCommentItem = (item, index) => {
  item = {
    id: index,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };
  return item;
};

const createPost = (id) => {
  const numberOfComments = getRandomNumber(0, 10);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_OF_PHOTOS),
    likes: getRandomNumber(15, 200),
    comments: Array(numberOfComments)
      .fill()
      .map((item, index) => createCommentItem(item, index)),
  };
};

for (let item = 1; item <= 25; item++) {
  posts.push(createPost(item));
}
