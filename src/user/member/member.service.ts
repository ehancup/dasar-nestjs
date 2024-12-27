import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../connection/connection';
import { Mail } from '../mail/mail';

@Injectable()
export class MemberService {
  constructor(private moduleRef: ModuleRef) {}

  getConnectionName(): string {
    const connection = this.moduleRef.get(Connection);
    return connection.getName();
  }

  sendEmail() {
    this.moduleRef.get(Mail).sendMail();
  }
}
