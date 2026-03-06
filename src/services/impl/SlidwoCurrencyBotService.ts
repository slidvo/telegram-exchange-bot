import type { CurrencyBotService } from "../CurrencyBotService.js";
import type { RequestBodyService } from "../RequestBodyService.js";

export class SlidwoCurrencyBotService implements CurrencyBotService {
  constructor(private requestBodyService: RequestBodyService) {}
  async processUpdate(req: any): Promise<void> {
    const data = await this.requestBodyService.readRequestBody(req);
  }
}
