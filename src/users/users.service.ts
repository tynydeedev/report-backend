import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';
import { InsertResult } from 'typeorm';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async createUser(credentials: CredentialsDto): Promise<InsertResult> {
    try {
      const { username, password } = credentials;

      const salt = await bcrypt.genSalt();
      const hassedPassword = await bcrypt.hash(password, salt);

      return await this.usersRepository.insert({
        username,
        password: hassedPassword,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException({
          status: 'error',
          message: 'Invalid username',
        });
      } else {
        throw new InternalServerErrorException({
          status: 'error',
          message: 'Internal Server Error',
        });
      }
    }
  }

  async signIn(credentials: CredentialsDto): Promise<boolean> {
    const { username, password } = credentials;

    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }

    return false;
  }
}
