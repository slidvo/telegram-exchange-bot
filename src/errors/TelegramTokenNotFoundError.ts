export class TelegramTokenNotFoundError extends Error {
  constructor() {
    super("Not found telegram token in Environments");
  }
}
