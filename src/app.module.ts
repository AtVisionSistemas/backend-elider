import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PessoaModule } from './pessoa/pessoa.module';
import { UsuariosModule } from './usuario/usuario.module';
import { AuthController } from './auth/auth.controller';
import { DbModule } from './db/db.module';
import { IgrejaModule } from './igreja/igreja.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PessoaModule,
    UsuariosModule,
    AuthModule,
    DbModule,
    IgrejaModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
