import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { DomainModule } from './domain.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
