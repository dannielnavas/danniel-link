import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShotLinkDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsString()
  @IsNotEmpty()
  readonly identifier: string;

  @IsNumber()
  @IsNotEmpty()
  readonly click: number;

  @IsString()
  @IsNotEmpty()
  readonly createdAt: string;
}
