import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from './../db/entities/pessoa.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity])],
  controllers: [PessoaController],
  providers: [PessoaService],
})
export class PessoaModule {}
