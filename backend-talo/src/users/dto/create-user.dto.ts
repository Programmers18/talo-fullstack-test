import { IsString } from "class-validator";

export class CreateUserDto {
	@IsString()
	readonly userId: string;

	@IsString()
	password: string;

	@IsString()
	readonly username: string;
}