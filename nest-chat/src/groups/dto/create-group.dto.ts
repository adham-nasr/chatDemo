import { IsEmail, IsString, Min, MinLength , IsOptional} from "class-validator";

export class CreateGroupDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
