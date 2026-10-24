import { IsEmail, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateMessageDto {
    /*
      sender: z.string().min(1, "Sender ID is required"),
  group: z.string().min(1, "Group ID is required"),
  content: z.string().optional(),
  fileUrl: z.string().optional(),
  fileType: z.string().optional(),
  */

    @IsString()
    @MinLength(1, { message: "Sender ID is required" })
    sender: string;

    @IsString()
    @MinLength(1, { message: "Group ID is required" })
    group: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    fileUrl?: string;

    @IsString()
    @IsOptional()
    fileType?: string;
    
  
}
