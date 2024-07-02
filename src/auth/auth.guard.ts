import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('APP_SECRET');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const chave = this.extrairChaveDoHeader(request);
    if (!chave) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(chave, {
        secret: this.jwtSecret,
      });

      request['login'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extrairChaveDoHeader(req: Request): string | undefined {
    const [type, chave] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? chave : undefined;
  }
}
