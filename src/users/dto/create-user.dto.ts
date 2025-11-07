import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "Email must be a string" })
  @IsEmail({}, { message: "Invalid email format" })
  readonly email: string;
  @IsString({ message: "Password must be a string" })
  @Length(4, 16, {
    message: "Password length must be between 4 and 16 characters",
  })
  readonly password: string;
}
