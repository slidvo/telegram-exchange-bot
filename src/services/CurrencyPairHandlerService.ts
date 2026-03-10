import type { Update } from "../dto/Update.js";

export interface CurrencyPairHandlerService {
  currencyPairHandle(currencyPair: string, update: Update): Promise<void>;
}
