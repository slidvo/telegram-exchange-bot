import type { Update } from "../dto/Update.js";

export interface CommandsService {
  start(update: Update): Promise<void>;
  info(): void;
  currency(): void;
}
