import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbUSUARIO' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuId: string;

  @Column({ type: 'datetime' })
  DtAtualizacao: Date;

  /****** Dados Pessoais ******/
  @Column({ nullable: true, unique: true })
  Nome: string;

  /****** Contato ******/
  @Column()
  FoneCelular: string;

  @Column()
  Email: string;

  /****** Acesso ******/
  @Column()
  Status: string;

  @Column()
  Login: string;

  @Column({ type: 'varchar', name: 'SenhaHash' })
  SenhaHash: string;

  @Column()
  idPessoa: number;
}
