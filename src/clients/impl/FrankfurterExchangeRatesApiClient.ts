import https from "https";
import type LatestRates from "../../dto/LatestRates.js";
import { toLatestRates } from "../../mappers/LatestRatesMapper.js";
import type { CurrencyApiClient as CurrencyApiClient } from "../CurrencyApiClient.js";
import type { BodyReaderService } from "../../services/BodyReaderService.js";
import log from "../../utils/logger.js";

/**
 * https://api.frankfurter.app
 * https://frankfurter.dev/
 */
export class FrankfurterExchangeRatesClient implements CurrencyApiClient {
  constructor(private bodyReaderService: BodyReaderService) {}
  async getLatestRates(base: string): Promise<LatestRates> {
    return new Promise((resolve, reject) => {
      const options: https.RequestOptions = {
        hostname: "api.frankfurter.dev",
        port: 443,
        path: `/v1/latest?base=${base}`,
        method: "GET",
        headers: {
          accept: "application/json",
        },
      };

      const req = https.request(options, async (res) => {
        log.DEBUG(
          `FrankfurterExchangeRatesClient.getLatestRates(${base}) request: ${JSON.stringify(options)}`,
        );
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP error! status: ${res.statusCode}`));
          return;
        }

        let data = await this.bodyReaderService.readBody(res);
        log.DEBUG(
          `FrankfurterExchangeRatesClient.getLatestRates(${base}) response: ${JSON.stringify(data)}`,
        );
        resolve(toLatestRates(data));
      });

      req.on("error", (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });
      req.end();
    });
  }
}
