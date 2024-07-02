import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_KEY'),
        database: configService.get<string>('DB_NAME'),
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
        synchronize: false,
        logging: true,
        entities: [__dirname + '/entities/**'],
        migrations: [__dirname + '/migration/*.ts'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
