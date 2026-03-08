export class EnvironmentsKeyNotFoundError extends Error {
  constructor(keyName: string) {
    super(`Not found key=${keyName} in Environments`);
  }
}
