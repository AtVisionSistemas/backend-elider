import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsInt,
} from 'class-validator';

export enum PessoaStatusEnum {
  ATIVO = 'Ativo',
  AGUARDANDO = 'Aguardando...',
  TRANSF = 'Transferido',
}

export enum PessoaSexoEnum {
  MAS = 'M',
  FEM = 'F',
}

export enum PessoaEscolaEnum {
  LE = 'Lê e Escreve',
  FI = 'Fund. Incompleto',
  FC = 'Fund. Completo',
  MI = 'Médio Incompleto',
  MC = 'Médio Completo',
  SI = 'Superior Incompleto',
  SC = 'Superior Completo',
  PG = 'Pós Gradução',
  ME = 'Mestrado',
}

export enum PessoaEstadoCivilEnum {
  SOL = 'Solteiro(a)',
  CAS = 'Casado(a)',
  VIU = 'Viúvo(a)',
  DIV = 'Divorciado(a)',
  OUT = 'Outro',
}

export class PessoaDto {
  @IsNotEmpty()
  @IsOptional()
  id: number;

  @IsUUID()
  @IsOptional()
  uuId: string;

  @IsDateString()
  @IsOptional()
  DtAtualizacao: Date;

  /****** Dados Pessoais ******/
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  @IsNotEmpty()
  Nome: string;

  @IsDateString()
  DtNasc: Date;

  @IsNumber()
  @IsOptional()
  idNatural: number;

  @IsEnum(PessoaSexoEnum)
  @IsOptional()
  @IsString()
  Sexo: string;

  @IsEnum(PessoaEscolaEnum)
  @IsOptional()
  @IsString()
  Escolaridade: string;

  @IsEnum(PessoaEstadoCivilEnum)
  @IsOptional()
  @IsString()
  EstadoCivil: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  Conjuge: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  NomePai: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  NomeMae: string;

  /****** Contato ******/
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(14)
  FoneCelular: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(14)
  FoneFixo: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(14)
  FoneOutro: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  Email: string;

  /****** Documentos ******/
  @IsOptional()
  @IsString()
  Identidade: string;

  @IsOptional()
  @IsString()
  Orgao: string;

  @IsOptional()
  @IsString()
  CPF: string;

  @IsOptional()
  @IsString()
  CNH: string;

  @IsOptional()
  @IsString()
  CatCNH: string;

  /****** Dados do Endereço ******/
  @IsOptional()
  @MinLength(9)
  @MaxLength(9)
  CEP: string;

  @IsOptional()
  @IsString()
  Endereco: string;

  @IsOptional()
  @IsString()
  Complemento: string;

  @IsOptional()
  @IsInt()
  idBairro: number;

  @IsOptional()
  @IsInt()
  idLogradouro: number;

  /****** Dados do trabalho ******/
  @IsOptional()
  @IsInt()
  idProfissao: number;

  @IsOptional()
  @IsString()
  TrabEmpresa: string;

  @IsOptional()
  @IsString()
  TrabCargo: string;
}

export interface findAllParameters {
  uuId: string;
  Nome: string;
}
