import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

	async getUserById(id: number): Promise<User> {
		const user = await this.usersRepository.findOneBy({ id });
		if (!user) {
			throw new NotFoundException(`User with Id ${id} not found`);
		}
		return user;
	} 

    async getUserByUserId(userId: string): Promise<User> {
		const user = await this.usersRepository
			.createQueryBuilder('user')
			.where('user.userId = :userId', { userId })
			.getOne();
		if (!user) {
			throw new NotFoundException(`User with user id ${userId} not found`);
		}
        return user;
    }

	async createUser(createUserDto: CreateUserDto) {
		const saltRounds = 10;
		const userId = createUserDto.userId;
		const existUser = await this.usersRepository
			.createQueryBuilder('user')
			.where('user.userId = :userId', { userId })
			.select(['user.userId'])
			.getOne();

		if (existUser) {
			throw new HttpException('User id already exists', HttpStatus.BAD_REQUEST);
		}

		createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);
		const user = this.usersRepository.create(createUserDto)
		
		await this.usersRepository.save(user);
		return user;
	}

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        this.usersRepository.update(id, updateUserDto);
    }

    async deleteUser(id: number): Promise<void> {
		const result = await this.usersRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException(`User with Id ${id} not found`);
		}
    }
}