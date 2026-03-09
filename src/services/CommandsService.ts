import type { Update } from "../dto/Update.js";

export interface CommandsService {
  start(update: Update): Promise<void>;
  currency(): void;
}
