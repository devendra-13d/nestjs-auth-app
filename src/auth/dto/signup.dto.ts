import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {

    @IsString()
    userName: string

    @IsEmail()
    emailId: string

    @IsString()
    @MinLength(8)
    password: string
}