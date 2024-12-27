import { Injectable } from '@nestjs/common';

export class Connection {
  getName(): string {
    return null;
  }
}

export const createConnection = () => {
  if (process.env.DATABASE == 'mysql') {
    return new MySqlConnection();
  } else {
    return new MongoConnection();
  }
};

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
