import { faker } from '@faker-js/faker';
import { User } from './Users';

export const createUserMock = (arrayLength: number): User[] => {
  const mock: User[] = [];
  for (let i = 1; i <= arrayLength; i++) {
    mock.push({
      id: i,
      name: faker.name.fullName(),
    });
  }
  return mock;
};
