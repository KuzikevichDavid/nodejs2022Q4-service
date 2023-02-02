import { PartialType } from "@nestjs/mapped-types";
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { isNull } from "util";

export class TrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId: string;

  @IsOptional()
  @IsUUID()
  albumId: string;
}
