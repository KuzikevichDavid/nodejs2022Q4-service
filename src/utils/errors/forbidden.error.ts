export class Forbidden extends Error {
  constructor(operation: string, message: string) {
    super(`Fail during ${operation}.`);
    this.name = 'Password change';
    this.message = message;
  }
}
