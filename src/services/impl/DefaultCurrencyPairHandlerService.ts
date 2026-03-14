import type { TelegramBotClient } from "../../clients/TelegramBotClient.js";
import type { Update } from "../../dto/Update.js";
import { CurrencyEnum } from "../../enums/CurrencyEnum.js";
import log from "../../utils/logger.js";
import type { CurrencyExchangeRatesService } from "../CurrencyExchangeRatesService.js";
import type { CurrencyPairHandlerService } from "../CurrencyPairHandlerService.js";

export class DefaultCurrencyPairHandlerService implements CurrencyPairHandlerService {
  constructor(
    private telegramBotClient: TelegramBotClient,
    private client: CurrencyExchangeRatesService,
  ) {}

  async currencyPairHandle(pair: string, update: Update): Promise<void> {
    const separator = "/";
    const separatedPair = pair.split(separator);
    if (separatedPair.length !== 2) {
      const msg = `Неверный формат данных. ${pair}`;
      log.DEBUG(msg);
      throw new Error(msg);
    }
    const main = separatedPair.at(0);
    const secondary = separatedPair.at(1);

    const isMainCorrect = this.isCurrencyCorrect(main!);
    if (!isMainCorrect) {
      const msg = `Неверная валюта main ${main}`;
      log.DEBUG(msg);
      throw new Error(msg);
    }

    const isSecondaryCorrect = this.isCurrencyCorrect(secondary!);
    if (!isSecondaryCorrect) {
      const msg = `Неверная валюта secondary ${secondary}`;
      log.DEBUG(msg);
      throw new Error(msg);
    }

    const exhangeRate = await this.client.getExchangeRate(main, secondary);
    this.telegramBotClient.sendMessage({
      chat_id: update.message.chat.id,
      text: `Текущий курс ${main} к ${secondary}: ${exhangeRate}`,
    });
  }

  private isCurrencyCorrect(currency: string): currency is CurrencyEnum {
    return Object.values(CurrencyEnum).includes(currency as CurrencyEnum);
  }
}
