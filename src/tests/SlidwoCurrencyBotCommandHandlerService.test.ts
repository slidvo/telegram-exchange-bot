import { describe, it, expect, vi, beforeEach } from "vitest";
import log from "../utils/logger.js";
import { SlidwoCurrencyBotCommandHandlerService } from "../services/impl/SlidwoCurrencyBotCommandHandlerService.js";
import type { ActionsProvider } from "../providers/ActionsProvider.js";
import type { TelegramBotClient } from "../clients/TelegramBotClient.js";
import type { CommandAction } from "../types/types.js";
import type { CommandsActionsProvider } from "../providers/CommandsActionsProvider.js";
import type { Update } from "../dto/Update.js";
describe("SlidwoCurrencyBotCommandHandlerService.test", async () => {
  let commandHandlerService: SlidwoCurrencyBotCommandHandlerService;
  let commandsActionsProvider: ActionsProvider;
  let telegramBotClient: TelegramBotClient;

  beforeEach(() => {
    telegramBotClient = {
      sendMessage: vi.fn(),
    };
    commandsActionsProvider = {
      getActionsMap: vi
        .fn()
        .mockReturnValue(
          new Map([["/start", { execute: vi.fn() } as CommandAction]]),
        ),
    };
    commandHandlerService = new SlidwoCurrencyBotCommandHandlerService(
      commandsActionsProvider as CommandsActionsProvider,
      telegramBotClient,
    );
  }); //
  //====

  it("/start action", async () => {
    await commandHandlerService.handleCommand("/start", {} as Update);
    expect(
      (commandsActionsProvider.getActionsMap().get("/start") as CommandAction)
        .execute,
    ).toHaveBeenCalled();
  });

  it("/unknown action", async () => {
    await commandHandlerService.handleCommand("/unknown", {
      message: { chat: { id: 42 } },
    } as Update);
    expect(commandsActionsProvider.getActionsMap().get("/unknown")).eq(
      undefined,
    );
  });
});
