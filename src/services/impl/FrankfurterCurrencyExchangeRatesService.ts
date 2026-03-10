import type { CurrencyApiClient } from "../../clients/CurrencyApiClient.js";
import type { CurrencyExchangeRatesService } from "../CurrencyExchangeRatesService.js";

export class FrankfurterCurrencyExchangeRatesService implements CurrencyExchangeRatesService {
  constructor(private client: CurrencyApiClient) {}
  async getExchangeRate(
    mainCurrency: string,
    secondary: string,
  ): Promise<number> {
    const latestRates = await this.client.getLatestRates(mainCurrency);
    //TODO
    let rate = latestRates.rates[secondary];
    if (!rate) {
      //TODO выбрасывать ошибку
      rate = 0;
    }
    return new Promise((resolve) => resolve(rate));
  }
}
