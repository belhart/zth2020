import {
  IsString,
  IsNotEmpty,
  IsIn
} from "class-validator";

export class EquipmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(["cash register", "oven"])
  type: string;

  @IsString()
  @IsNotEmpty()
  locatedat: string;
}
