import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export class CredentialsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(passwordRegex, { message: 'password is too weak' })
  password: string;
}
