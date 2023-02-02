import { Injectable } from "@nestjs/common";
import { TrackDto } from "src/routes/track/track.dto";
import { genId } from "../idUtils";
import { EntityService } from "./entity.service";
import { TrackEntity } from "./track.entity";

@Injectable()
export class TrackService extends EntityService<TrackEntity, TrackDto, TrackDto>{
  constructor() {
    super('track');
  }

  async create(trackDto: TrackDto): Promise<TrackEntity> {
    const track: TrackEntity = new TrackEntity({
      ...trackDto,
      id: genId(),
    });
    this.entities.push(track);
    return track
  }
}