import { describe, it, expect, vi, beforeEach } from "vitest";
import { FrankfurterCurrencyExchangeRatesService } from "../services/impl/FrankfurterCurrencyExchangeRatesService.js";
import log from "../utils/logger.js";
import type { CurrencyApiClient } from "../clients/CurrencyApiClient.js";

describe("FrankfurterCurrencyExchangeRatesService", () => {
  let frankfurterCurrencyExchangeRatesService: FrankfurterCurrencyExchangeRatesService;
  let mockCurrencyClient: CurrencyApiClient;
  beforeEach(() => {
    mockCurrencyClient = {
      getLatestRates: vi.fn().mockResolvedValue({
        base: "USD",
        date: "2021-03-17",
        rates: {
          AUD: 1.566015,
          CAD: 1.560132,
          CHF: 1.154727,
          CNY: 7.827874,
          GBP: 0.882047,
          JPY: 132.360679,
        },
      }),
    };
    frankfurterCurrencyExchangeRatesService =
      new FrankfurterCurrencyExchangeRatesService(mockCurrencyClient);
  });

  it("", async () => {
    const rate = await frankfurterCurrencyExchangeRatesService.getExchangeRate(
      "USD",
      "AUD",
    );
    log.DEBUG(`rate = ${rate}`);
    expect(rate).eq(1.566015);
  });
});
