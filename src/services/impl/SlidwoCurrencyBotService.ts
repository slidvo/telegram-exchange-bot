import type { SlidwoCurrencyBotCommand } from "../../dto/SlidwoCurrencyBotCommand.js";
import type Update from "../../dto/Update.js";
import type { CurrencyBotService } from "../CurrencyBotService.js";
import type { RequestBodyService } from "../RequestBodyService.js";
import type { SlidwoCurrencyBotCommandHandlerService as CommandsHandler } from "./SlidwoCurrencyBotCommandHandlerService.js";

export class SlidwoCurrencyBotService implements CurrencyBotService {
  constructor(
    private requestBodyService: RequestBodyService,
    private commandsHandler: CommandsHandler,
  ) {}
  async processUpdate(req: any): Promise<void> {
    const update = await this.requestBodyService.readRequestBody<Update>(req);
    const updateMessageText = update.message.text;
    this.commandsHandler.handleCommand(updateMessageText);
    //TODO use API sendMessage, for sending result of command handling to user in telegram chat
  }
}
