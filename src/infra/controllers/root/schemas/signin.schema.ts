import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninSchema {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
