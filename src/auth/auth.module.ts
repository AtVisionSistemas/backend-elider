import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuario/usuario.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('APP_SECRET'),
        signOptions: {
          expiresIn: +configService.get<number>('APP_SECRET_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
    UsuariosModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
