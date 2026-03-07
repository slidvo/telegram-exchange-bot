import type { Update } from "../dto/Update.js";

export interface CommandsHandlerService {
  handleCommand(update: Update): void;
}
