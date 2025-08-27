import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }


}
