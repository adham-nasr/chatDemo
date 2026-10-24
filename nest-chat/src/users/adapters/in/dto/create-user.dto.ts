import { IsEmail, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @MinLength(3)
    username:string;

    @IsString()
    @MinLength(3)
    password:string

}
