import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('/login')
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto);
	}

	@Get('/profile')
	getProfile(@Request() req) {
		return this.authService.profile(req.user.userId);
	}
}
