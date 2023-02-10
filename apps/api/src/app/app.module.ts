import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BigPartyModule } from '../big-party/big-party.module';
import { UserModule } from '../user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './apps/api/database.sqlite3',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    BigPartyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
