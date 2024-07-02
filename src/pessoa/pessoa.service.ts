import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PessoaEntity } from './../db/entities/pessoa.entity';
import { PessoaDto, findAllParameters } from './pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepository: Repository<PessoaEntity>,
  ) {}

  private pessoas: PessoaDto[] = [];

  /* CREATE - adiciona os dados de uma pessoa na tabela tbPessoa */
  async create(tbPessoa: PessoaDto) {
    const pessoaToSave: PessoaEntity = {
      DtAtualizacao: tbPessoa.DtAtualizacao,
      Nome: tbPessoa.Nome,
      DtNasc: tbPessoa.DtNasc,
      idNatural: tbPessoa.idNatural,
      Sexo: tbPessoa.Sexo,
      Escolaridade: tbPessoa.Escolaridade,
      EstadoCivil: tbPessoa.EstadoCivil,
      Conjuge: tbPessoa.Conjuge,
      NomePai: tbPessoa.NomePai,
      NomeMae: tbPessoa.NomeMae,
      FoneCelular: tbPessoa.FoneCelular,
      FoneFixo: tbPessoa.FoneFixo,
      FoneOutro: tbPessoa.FoneOutro,
      Email: tbPessoa.Email,
      Identidade: tbPessoa.Identidade,
      Orgao: tbPessoa.Orgao,
      CPF: tbPessoa.CPF,
      CNH: tbPessoa.CNH,
      CatCNH: tbPessoa.CatCNH,
      CEP: tbPessoa.CEP,
      Endereco: tbPessoa.Endereco,
      Complemento: tbPessoa.Complemento,
      idBairro: tbPessoa.idBairro,
      idLogradouro: tbPessoa.idLogradouro,
      idProfissao: tbPessoa.idProfissao,
      TrabEmpresa: tbPessoa.TrabEmpresa,
      TrabCargo: tbPessoa.TrabCargo,
    };
    const createdPessoa = await this.pessoaRepository.save(pessoaToSave);

    return this.mapEntityToDto(createdPessoa);
  }

  /* READ ID - procura os dados de uma pessoa pelo UUID na tabela tbPessoa */
  async findByUuid(uuid: string): Promise<PessoaDto> {
    const foundPessoa = await this.pessoaRepository.findOne({
      where: { uuId: uuid },
    });

    if (!foundPessoa) {
      throw new HttpException(
        `Pessoa com o ID: '${uuid}' não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(foundPessoa);
  }

  /* READ ALL - procura os dados de todas as pessoas na tabela tbPessoa */
  async findAll(params: findAllParameters): Promise<PessoaDto[]> {
    const searchParams: FindOptionsWhere<PessoaEntity> = {};

    if (params.uuId) {
      searchParams.uuId = Like(`%${params.uuId}%`);
    }
    if (params.Nome) {
      searchParams.Nome = Like(`%${params.Nome}%`);
    }

    const pessoaFound = await this.pessoaRepository.find({
      where: searchParams,
    });

    return pessoaFound.map((PessoaEntity) => this.mapEntityToDto(PessoaEntity));
  }

  /* UPDATE - altera os dados de um determinado registro na tabela tbPessoa */
  async update(uuid: string, pessoa: PessoaDto): Promise<void> {
    const foundPessoa = await this.pessoaRepository.findOne({
      where: { uuId: uuid },
    });

    if (!foundPessoa) {
      throw new HttpException(
        `Pessoa com o ID: '${uuid}' não encontrado`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedPessoa = this.mapDtoToEntity(pessoa);
    updatedPessoa.DtAtualizacao = new Date(); // Atualiza a data de atualização

    await this.pessoaRepository.update({ uuId: uuid }, updatedPessoa);
  }

  /* DELETA - delate o dado de um determinado registro na tabela tbPessoa */
  async remove(uuid: string) {
    const result = await this.pessoaRepository.delete({ uuId: uuid });

    if (!result.affected) {
      throw new HttpException(
        `Pessoa com o ID: '${uuid}' não encontrado`,
        HttpStatus.BAD_REQUEST,
      );
    }

    throw new HttpException(
      `Pessoa com id '${uuid}' foi excluida com sucesso`,
      HttpStatus.ACCEPTED,
    );
  }

  private mapEntityToDto(pessoaEntity: PessoaEntity): PessoaDto {
    return {
      id: pessoaEntity.id,
      uuId: pessoaEntity.uuId,
      DtAtualizacao: pessoaEntity.DtAtualizacao,
      Nome: pessoaEntity.Nome,
      DtNasc: pessoaEntity.DtNasc,
      idNatural: pessoaEntity.idNatural,
      Sexo: pessoaEntity.Sexo,
      Escolaridade: pessoaEntity.Escolaridade,
      EstadoCivil: pessoaEntity.EstadoCivil,
      Conjuge: pessoaEntity.Conjuge,
      NomePai: pessoaEntity.NomePai,
      NomeMae: pessoaEntity.NomeMae,
      FoneCelular: pessoaEntity.FoneCelular,
      FoneFixo: pessoaEntity.FoneFixo,
      FoneOutro: pessoaEntity.FoneOutro,
      Email: pessoaEntity.Email,
      Identidade: pessoaEntity.Identidade,
      Orgao: pessoaEntity.Orgao,
      CPF: pessoaEntity.CPF,
      CNH: pessoaEntity.CNH,
      CatCNH: pessoaEntity.CatCNH,
      CEP: pessoaEntity.CEP,
      Endereco: pessoaEntity.Endereco,
      Complemento: pessoaEntity.Complemento,
      idBairro: pessoaEntity.idBairro,
      idLogradouro: pessoaEntity.idLogradouro,
      idProfissao: pessoaEntity.idProfissao,
      TrabEmpresa: pessoaEntity.TrabEmpresa,
      TrabCargo: pessoaEntity.TrabCargo,
    };
  }

  private mapDtoToEntity(pessoaDto: PessoaDto): Partial<PessoaEntity> {
    return {
      id: pessoaDto.id,
      uuId: pessoaDto.uuId,
      DtAtualizacao: pessoaDto.DtAtualizacao,
      Nome: pessoaDto.Nome,
      DtNasc: pessoaDto.DtNasc,
      idNatural: pessoaDto.idNatural,
      Sexo: pessoaDto.Sexo,
      Escolaridade: pessoaDto.Escolaridade,
      EstadoCivil: pessoaDto.EstadoCivil,
      Conjuge: pessoaDto.Conjuge,
      NomePai: pessoaDto.NomePai,
      NomeMae: pessoaDto.NomeMae,
      FoneCelular: pessoaDto.FoneCelular,
      FoneFixo: pessoaDto.FoneFixo,
      FoneOutro: pessoaDto.FoneOutro,
      Email: pessoaDto.Email,
      Identidade: pessoaDto.Identidade,
      Orgao: pessoaDto.Orgao,
      CPF: pessoaDto.CPF,
      CNH: pessoaDto.CNH,
      CatCNH: pessoaDto.CatCNH,
      CEP: pessoaDto.CEP,
      Endereco: pessoaDto.Endereco,
      Complemento: pessoaDto.Complemento,
      idBairro: pessoaDto.idBairro,
      idLogradouro: pessoaDto.idLogradouro,
      idProfissao: pessoaDto.idProfissao,
      TrabEmpresa: pessoaDto.TrabEmpresa,
      TrabCargo: pessoaDto.TrabCargo,
    };
  }
}
