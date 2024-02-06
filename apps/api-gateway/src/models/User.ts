/* eslint-disable @typescript-eslint/no-empty-interface */
import { neogma } from '../neo4j/database';

import { ModelFactory } from 'neogma';

export type UsersPropertiesI = {
  email: string;
  password: string;

  firstName: string;
  lastName: string;
};

export const Users = ModelFactory<UsersPropertiesI>(
  {
    label: 'User',
    primaryKeyField: 'email',
    schema: {
      email: {
        type: 'string',
        minLength: 1,
        required: true,
      },
      password: {
        type: 'string',
        minimum: 1,
        required: true,
      },
      lastName: {
        type: 'string',
        minimum: 1,
        required: true,
      },
      firstName: {
        type: 'string',
        minimum: 1,
        required: true,
      },
    },
  },
  neogma,
);
