import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PessoaDto, findAllParameters } from './pessoa.dto';
import { PessoaService } from './pessoa.service';
import { AuthGuard } from './../auth/auth.guard';

@UseGuards(AuthGuard) // Define a segurança de autenticação//
@Controller('pessoa') // definição do link exemplo: localhost:8181/pessoa/??
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  /* CREATE - adiciona os dados de uma pessoa na tabela tbPessoa */
  @Post()
  async create(@Body() pessoa: PessoaDto): Promise<PessoaDto> {
    return await this.pessoaService.create(pessoa);
  }

  /* READ ID - procura os dados de uma pessoa pelo UUID na tabela tbPessoa */
  @Get('/:id')
  async findByUuid(@Param('id') uuId: string): Promise<PessoaDto> {
    return this.pessoaService.findByUuid(uuId);
  }

  /* READ ALL - procura os dados de todas as pessoas na tabela tbPessoa */
  @Get()
  async findAll(@Query() params: findAllParameters): Promise<PessoaDto[]> {
    return this.pessoaService.findAll(params);
  }

  /* UPDATE ID - Atualiza dados de uma pessoa na tabela tbPessoa */
  @Put('/:uuId')
  async update(@Param('uuId') uuId: string, @Body() pessoa: PessoaDto) {
    await this.pessoaService.update(uuId, pessoa);
  }

  @Delete('/:uuid')
  remove(@Param('uuid') uuid: string) {
    return this.pessoaService.remove(uuid);
  }
}
