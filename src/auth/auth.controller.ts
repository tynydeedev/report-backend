import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserResponse } from './dto/signup-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createUser(@Body() credentials: CredentialsDto): Promise<CreateUserResponse> {
    return this.authService.createUser(credentials);
  }

  @Post('signin')
  signIn(@Body() credentials: CredentialsDto) {
    return this.authService.signIn(credentials);
  }
}
