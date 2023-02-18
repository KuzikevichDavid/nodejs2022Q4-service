import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class TrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;
}
