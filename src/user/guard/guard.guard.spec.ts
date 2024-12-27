import { Reflector } from '@nestjs/core';
import { GuardGuard } from './guard.guard';

describe('GuardGuard', () => {
  it('should be defined', () => {
    expect(new GuardGuard(new Reflector())).toBeDefined();
  });
});
