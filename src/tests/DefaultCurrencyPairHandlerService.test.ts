import { describe, it, expect, vi, beforeEach } from "vitest";
import DefaultBodyReaderService from "../services/impl/DefaultBodyReaderService.js";
import { IncomingMessage } from "node:http";
import { PassThrough } from "node:stream";
import log from "../utils/logger.js";
import { DefaultCurrencyPairHandlerService } from "../services/impl/DefaultCurrencyPairHandlerService.js";
import type { TelegramBotClient } from "../clients/TelegramBotClient.js";
import type { CurrencyExchangeRatesService } from "../services/CurrencyExchangeRatesService.js";

describe("DefaultCurrencyPairHandlerService.test", () => {
  let defaultCurrencyPairHandlerService: DefaultCurrencyPairHandlerService;
  let telegramBotClient: TelegramBotClient;
  let currencyExchangeRatesService: CurrencyExchangeRatesService;

  beforeEach(() => {
    telegramBotClient = {
      sendMessage: vi.fn(),
    };
  });
});
