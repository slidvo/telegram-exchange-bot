import type LatestRates from "../dto/LatestRates.js";

export interface CurrencyClient {
  getLatestRates(base: string | undefined): Promise<LatestRates>;
}
