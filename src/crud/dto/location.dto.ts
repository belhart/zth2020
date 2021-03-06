import { IsString, IsNotEmpty } from "class-validator";

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
