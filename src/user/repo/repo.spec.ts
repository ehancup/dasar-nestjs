import { Test, TestingModule } from '@nestjs/testing';
import { Repo } from './repo';

describe('Repo', () => {
  let provider: Repo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Repo],
    }).compile();

    provider = module.get<Repo>(Repo);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
