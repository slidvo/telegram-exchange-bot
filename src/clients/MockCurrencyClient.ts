import type LatestRates from "../dto/LatestRates.js";
import { toLatestRates } from "../mappers/LatestRatesMapper.js";
import type { CurrencyClient } from "./CurrencyClient.js";

export class MockCurrencyClient implements CurrencyClient {
  async getLatestRates(base: string = "EUR"): Promise<LatestRates> {
    const response = {
      success: true,
      timestamp: 1519296206,
      base: base,
      date: "2021-03-17",
      rates: {
        AUD: 1.566015,
        CAD: 1.560132,
        CHF: 1.154727,
        CNY: 7.827874,
        GBP: 0.882047,
        JPY: 132.360679,
      },
    };
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(toLatestRates(response));
      }, 1000);
    });
  }
}
