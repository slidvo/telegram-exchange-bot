import type { Update } from "../dto/Update.js";

export interface CurrencyBotService {
  processUpdate(update: Update): void;
}
