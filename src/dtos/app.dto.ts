import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShotLinkDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsString()
  @IsNotEmpty()
  readonly identifier: string;

  @IsString()
  @IsNotEmpty()
  readonly key: string;
}
