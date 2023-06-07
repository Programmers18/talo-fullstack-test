import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async signIn(signInDto: SignInDto) {
		const { userId, password } = signInDto;
		const user = await this.usersService.getUserByUserId(userId);
		let isValidPass = await bcrypt.compare(password, user.password);
		if (!isValidPass) {
			throw new UnauthorizedException();
		}
		const payload = { userId, sub: user.id };
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}

	async profile(userId: string): Promise<User> {
		return this.usersService.getUserByUserId(userId);
	}
}
