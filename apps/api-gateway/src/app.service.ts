import { Injectable } from '@nestjs/common';
import { Users } from './models/User';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  findAll(): string {
    return 'This action returns all cats';
  }

  findAllV2(): string {
    return 'This action returns all cats V2';
  }

  async createUser() {
    return await Users.createOne({
      email: 'test@test.com',
      password: '123456',
      firstName: 'test',
      lastName: 'test',
    });
  }
}
