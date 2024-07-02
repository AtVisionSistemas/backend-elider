import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbPESSOA' })
export class PessoaEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true, unique: true })
  uuId?: string;

  @Column({ type: 'datetime' })
  DtAtualizacao: Date;

  /****** Dados Pessoais ******/
  @Column({ nullable: true, unique: true })
  Nome: string;

  @Column()
  DtNasc: Date;

  @Column()
  idNatural: number;

  @Column()
  Sexo: string;

  @Column()
  Escolaridade: string;

  @Column()
  EstadoCivil: string;

  @Column()
  Conjuge: string;

  @Column()
  NomePai: string;

  @Column()
  NomeMae: string;

  /****** Contato ******/
  @Column()
  FoneCelular: string;

  @Column()
  FoneFixo: string;

  @Column()
  FoneOutro: string;

  @Column()
  Email: string;

  /****** Documentos ******/
  @Column()
  Identidade: string;

  @Column()
  Orgao: string;

  @Column()
  CPF: string;

  @Column()
  CNH: string;

  @Column()
  CatCNH: string;

  /****** Dados do Endereço ******/
  @Column()
  CEP: string;

  @Column()
  Endereco: string;

  @Column()
  Complemento: string;

  @Column()
  idBairro: number;

  @Column()
  idLogradouro: number;

  /****** Dados do trabalho ******/
  @Column()
  idProfissao: number;

  @Column()
  TrabEmpresa: string;

  @Column()
  TrabCargo: string;
}
