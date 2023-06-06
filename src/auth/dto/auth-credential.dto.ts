import { IsString, Matches } from "class-validator";

export class AuthCredentialDto {
  @IsString()
  username: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string;
}
