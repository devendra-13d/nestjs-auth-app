import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
