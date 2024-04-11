import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  sayHello() {
    return 'hello you';
  }
}
