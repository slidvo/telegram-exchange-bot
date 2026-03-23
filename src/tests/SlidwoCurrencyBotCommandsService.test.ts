import { describe, it, expect, vi, beforeEach } from "vitest";
import log from "../utils/logger.js";
import { SlidwoCurrencyBotCommandsService } from "../services/impl/SlidwoCurrencyBotCommandsService.js";
import type { TelegramBotClient } from "../clients/TelegramBotClient.js";
import type { Update } from "../dto/Update.js";

describe("SlidwoCurrencyBotCommandsService.test", async () => {
  let commandService: SlidwoCurrencyBotCommandsService;
  let tgBotClient: TelegramBotClient;
  beforeEach(() => {
    tgBotClient = {
      sendMessage: vi.fn(),
    };

    commandService = new SlidwoCurrencyBotCommandsService(tgBotClient);
  }); //

  it("start", async () => {
    await commandService.start({ message: { chat: { id: 42 } } } as Update);
    expect(tgBotClient.sendMessage).toHaveBeenCalled();
  });
  it("currency", async () => {
    await commandService.currency({ message: { chat: { id: 42 } } } as Update);
    expect(tgBotClient.sendMessage).toHaveBeenCalled();
  });
});
