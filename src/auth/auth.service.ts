import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { hashPassword, verifyPassword } from './utils/password.util';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,

    ) { }

    async signup(signupDto: SignupDto): Promise<{ message: string }> {

        const existingUser = await this.userService.findByEmail(signupDto.emailId);
        if (existingUser) {
            throw new BadRequestException(`Email already in use`);
        }

        const hashedPassword = await hashPassword(signupDto.password);

        await this.userService.create({ ...signupDto, password: hashedPassword, })
        return { message: `User registered succesfully` };
    }

    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const existingUser = await this.userService.findByEmail(loginDto.emailId)
        if (!existingUser) {
            throw new BadRequestException(`EmailId is not matched`);
        }

        const isPasswordValid = await verifyPassword(loginDto.password, existingUser.password);

        if (!isPasswordValid) {
            throw new BadRequestException(`Your entered password incorrect`);
        }

        const payload = { sub: existingUser.id, email: existingUser.emailId };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }
}
