import { Controller, Post, Body, Get, Put, Delete,Param, ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

	@Get()
	async getAllUser(): Promise<User[]> {
		return await this.usersService.getAllUsers();
	}

    @Get('/:id')
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.usersService.getUserById(id);
    }

	@Public()
    @Post('/register')
    async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.usersService.deleteUser(id);
    }
}