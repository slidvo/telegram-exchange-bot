export interface CurrencyExchangeRatesService {
  getExchangeRate(mainCurrency: string, secondary: string): Promise<number>;
}
