import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation.service';

interface ValidationModuleProps {
  isGlobal: boolean;
}

@Module({})
export class ValidationModule {
  static forRoot({ isGlobal }: ValidationModuleProps): DynamicModule {
    return {
      module: ValidationModule,
      global: isGlobal,
      providers: [ValidationService],
      exports: [ValidationService],
    };
  }
}
