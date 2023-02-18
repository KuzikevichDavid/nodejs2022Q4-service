export class Entity {
  id: string; // uuid v4

  constructor(partial: Partial<Entity>) {
    Object.assign(this, partial);
  }
}
