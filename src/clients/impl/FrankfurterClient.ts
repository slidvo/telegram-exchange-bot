import type LatestRates from "../../dto/LatestRates.js";
import type { CurrencyClient } from "../CurrencyClient.js";

//TODO https://api.frankfurter.app
// https://frankfurter.dev/
export class FrankfurterClient implements CurrencyClient {
  getLatestRates(base: string | undefined): Promise<LatestRates> {
    throw new Error("Method not implemented.");
  }
}
