import { Neogma, QueryBuilder, QueryRunner } from 'neogma';
export const neogma = new Neogma(
  {
    url: 'neo4j://localhost:7687',
    username: 'neo4j',
    password: '12345678',
  },
  {
    logger: console.log,
    encrypted: false,
  },
);
