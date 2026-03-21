import { describe, it, expect, vi, beforeEach } from "vitest";
import { DefaultCurrencyPairHandlerService } from "../services/impl/DefaultCurrencyPairHandlerService.js";
import type { TelegramBotClient } from "../clients/TelegramBotClient.js";
import type { CurrencyExchangeRatesService } from "../services/CurrencyExchangeRatesService.js";
import type { Update } from "../dto/Update.js";
import { InvalidDataFormatError } from "../errors/InvalidDataFormatError.js";
import { InvalidCurrencyCodeError } from "../errors/InvalidCurrencyCodeError.js";

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
  //================
  it("Base currency is wrong", async () => {
    await expect(
      defaultCurrencyPairHandlerService.currencyPairHandle(
        "AAA/USD",
        {} as Update,
      ),
    ).rejects.toThrow(InvalidCurrencyCodeError);
  });
  //=================
  it("Quote currency is wrong", async () => {
    await expect(
      defaultCurrencyPairHandlerService.currencyPairHandle(
        "USD/AAA",
        {} as Update,
      ),
    ).rejects.toThrow(InvalidCurrencyCodeError);
  });
  //================
  it("Currency pair is correct", async () => {
    await defaultCurrencyPairHandlerService.currencyPairHandle("USD/AUD", {
      message: {
        chat: {
          id: 42,
        },
      },
    } as Update);
    expect(currencyExchangeRatesService.getExchangeRate).toHaveBeenCalled();
    expect(telegramBotClient.sendMessage).toHaveBeenCalled();
  });
});
