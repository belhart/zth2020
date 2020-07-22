import { IsString, IsNotEmpty, IsLowercase } from 'class-validator';

export class EmployeeDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    job: string;

    @IsString()
    @IsNotEmpty()
    worksat: string;

    @IsString()
    @IsNotEmpty()
    operates: string;
}