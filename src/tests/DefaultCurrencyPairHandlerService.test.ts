import { describe, it, expect, vi, beforeEach } from "vitest";
import { DefaultCurrencyPairHandlerService } from "../services/impl/DefaultCurrencyPairHandlerService.js";
import type { TelegramBotClient } from "../clients/TelegramBotClient.js";
import type { CurrencyExchangeRatesService } from "../services/CurrencyExchangeRatesService.js";
import type { Update } from "../dto/Update.js";
import { InvalidDataFormatError } from "../errors/InvalidDataFormatError.js";

describe("DefaultCurrencyPairHandlerService.test", () => {
  let defaultCurrencyPairHandlerService: DefaultCurrencyPairHandlerService;
  let telegramBotClient: TelegramBotClient;
  let currencyExchangeRatesService: CurrencyExchangeRatesService;

  beforeEach(() => {
    telegramBotClient = {
      sendMessage: vi.fn(),
    };

    currencyExchangeRatesService = {
      getExchangeRate: vi.fn().mockResolvedValue(42),
    };

    defaultCurrencyPairHandlerService = new DefaultCurrencyPairHandlerService(
      telegramBotClient,
      currencyExchangeRatesService,
    );
  });
  //==============
  it("Wrong currency pair format", async () => {
    await expect(
      defaultCurrencyPairHandlerService.currencyPairHandle(
        "USD-RUB",
        {} as Update,
      ),
    ).rejects.toThrow(InvalidDataFormatError);
  });
});
