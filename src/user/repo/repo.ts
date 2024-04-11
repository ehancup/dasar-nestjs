import { Connection } from '../connection/connection';

export class Repo {
  connection: Connection;

  save() {
    console.log(`saving with ${this.connection.getName()}`);
  }
}

export function createUserRepo(connection: Connection): Repo {
  const repository = new Repo();
  repository.connection = connection;
  return repository;
}
