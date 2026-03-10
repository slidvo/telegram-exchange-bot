import type LatestRates from "../dto/LatestRates.js";

export interface CurrencyApiClient {
  getLatestRates(base: string): Promise<LatestRates>;
}
