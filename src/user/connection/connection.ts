import { Injectable } from '@nestjs/common';

export class Connection {
  getName(): string {
    return null;
  }
}

@Injectable()
export class MySqlConnection extends Connection {
  getName(): string {
    return 'MySql connection';
  }
}
@Injectable()
export class MongoConnection extends Connection {
  getName(): string {
    return 'MongoDb connection';
  }
}
