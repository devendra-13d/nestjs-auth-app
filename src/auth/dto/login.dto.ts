import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {

    @IsEmail()
    emailId: string

    @IsString()
    @MinLength(8)
    password: string

}
