import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuario/usuario.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  private jwtTempoChaveExpirada: number;

  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtTempoChaveExpirada =
      +this.configService.get<number>('APP_SECRET_EXPIRE');
  }
  async signIn(login: string, senha: string): Promise<AuthResponseDto> {
    const foundLogin = await this.usuarioService.findByLogin(login);

    if (!foundLogin) {
      throw new UnauthorizedException('Credenciais inválidas - login');
    }

    if (!senha || !foundLogin.Senha) {
      throw new UnauthorizedException('Credenciais inválidas - senha');
    }

    if (!bcryptCompareSync(senha, foundLogin.Senha)) {
      throw new UnauthorizedException('Credenciais inválidas - senha token');
    }

    const payload = { sub: foundLogin.id, login: foundLogin.Login };

    const chave = this.jwtService.sign(payload);

    return { chave, expira: this.jwtTempoChaveExpirada };
  }
}
