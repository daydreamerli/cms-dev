import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => Object.assign(await getConnectionOptions()),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  constructor(connection: Connection) {
    if (connection.isConnected) console.log('Mysql DB Connected Successfully!');
  }
}
