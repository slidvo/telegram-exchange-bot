import { EnvironmentsKeyNotFoundError } from "../../errors/EnvironmentsKeyNotFoundError.js";
import type { EnvironmentService } from "../EnvironmentService.js";

export class DefaultEnvironmentService implements EnvironmentService {
  get(key: string): Promise<string> {
    const keyValue = process.env[key];
    if (!keyValue) {
      throw new EnvironmentsKeyNotFoundError(key);
    }
    return Promise.resolve(keyValue);
  }
}
