import { IsString, IsNotEmpty, IsIn, Min, IsInt } from "class-validator";

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(["manager", "cashier", "cook"])
  job: string;

  @IsString()
  @IsNotEmpty()
  worksat: string;

  @IsString()
  @IsNotEmpty()
  operates: string;

  @IsInt()
  @IsNotEmpty()
  @Min(300)
  salary: Number;
}
