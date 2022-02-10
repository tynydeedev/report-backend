import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import { SignInResponse } from './dto/signin-response.dto';
import { CreateUserResponse } from './dto/signup-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(credentials: CredentialsDto): Promise<CreateUserResponse> {
    await this.usersService.createUser(credentials);

    return {
      status: 'success',
      username: credentials.username,
    };
  }

  async signIn(credentials: CredentialsDto): Promise<SignInResponse> {
    const result = await this.usersService.signIn(credentials);

    if (result) {
      const payload: JwtPayload = { username: credentials.username };

      return {
        status: 'success',
        token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException({
      status: 'error',
      message: 'unauthorized',
    });
  }
}
