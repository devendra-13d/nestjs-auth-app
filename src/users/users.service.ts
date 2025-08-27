import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(userInfo: Partial<User>): Promise<User> {
        return this.userRepository.save(userInfo);
    }

    async findByEmail(emailId: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { emailId } });
    }
}
