import { faker } from '@faker-js/faker';
import { Post } from './Posts';

export const postsMock: Post[] = [
  {
    body: 'post text',
    id: 1,
    title: 'post title',
    userId: 1,
  },
  {
    body: 'post text',
    id: 2,
    title: 'post title',
    userId: 1,
  },
];

export const createPostMock = (arrayLength: number): Post[] => {
  const mock: Post[] = [];
  for (let i = 1; i <= arrayLength; i++) {
    mock.push({
      id: i,
      body: faker.animal.type(),
      title: faker.animal.type(),
      userId: Math.floor(Math.random() * 100) + 1,
    });
  }
  return mock;
};
