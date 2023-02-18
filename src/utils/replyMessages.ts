export const idNotFound = (entityName: string, id: string): string =>
  `${entityName} with id '${id}' not found`;

export const existsWithEntityId = (entityName: string, id: string): string =>
  `${entityName} with ${entityName} id '${id}' alredy exists`;

export const badId = (id: string) => `${id} isn't valid 'id' string`;
